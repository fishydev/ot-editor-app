import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view'
import {
  Update,
  receiveUpdates,
  sendableUpdates,
  collab,
  getSyncedVersion
} from "@codemirror/collab";
import { Socket } from "socket.io-client"
import { ChangeSet } from "@codemirror/state";

const pushUpdates = async (socket: Socket, version: number, fullUpdates: readonly Update[]): Promise<boolean> => {
  let updates = fullUpdates.map((u) => ({
    clientId: u.clientID,
    changes: u.changes.toJSON(),
  }))

  return await new Promise((resolve) => {
    console.log(`pushUpdates req sent`)
    socket.emit(
      'pushUpdates',
      {
        version: version,
        updates: updates,
      },
      (data: any) => {
        resolve(data)
      }
    )
  })
}

const pullUpdates = async (socket: Socket, version: number): Promise<readonly Update[]> => {
  console.log(`pullUpdates req sent`)
  return await new Promise((resolve) => {
    socket.emit('pullUpdates', { version: version }, (data: any) => {
      // console.log('pullUpdates res')
      // console.log(data)
      console.log(`data`)
      console.log(data)
      if (data.length > 0) {
        resolve(
          data.map((u: any) => ({
            changes: ChangeSet.fromJSON(u.changes),
            clientId: u.clientID,
          }))
        )
      } else {
        resolve([])
      }
    })
  })
}

export const getClientExtension = (startVersion: number, socket: Socket) => {
  let plugin = ViewPlugin.fromClass(
    class {
      pushing = false;
      done = false;

      constructor(private view: EditorView) {
        this.view = view;
        this.pull()
      }

      update(update: ViewUpdate) {
        if (update.docChanged) this.push()
      }

      async push() {
        const updates = sendableUpdates(this.view.state);
        if (this.pushing || !updates.length) {
          return;
        }
        this.pushing = true;
        const version = getSyncedVersion(this.view.state);
        await pushUpdates(socket, version, updates);
        this.pushing = false;
        // Regardless of whether the push failed or new updates came in
        // while it was running, try again if there's updates remaining
        if (sendableUpdates(this.view.state).length) {
          setTimeout(() => this.push(), 5000);
        }
      }

      async pull() {
        while (!this.done) {
          const version = getSyncedVersion(this.view.state);
          const updates = await pullUpdates(socket, version);
          if (updates.length > 0) {
            this.view.dispatch(receiveUpdates(this.view.state, updates));
          }
        }
      }

      destroy() {
        this.done = true;
      }
    }
  )
  return [collab({ startVersion }), plugin]
}