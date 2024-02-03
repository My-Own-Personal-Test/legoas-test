import type { Ref } from 'vue'
import { ref } from 'vue'

/**
 * Payload object for controlling the dialog state.
 *
 * @property content - The content identifier for the dialog.
 * @property show - A boolean indicating whether to show or hide the dialog.
 */
interface DialogPayload {
  content: string
  show: boolean
}

export class DialogController {
  public dialogState: Ref<boolean>
  public contentElement: Ref<HTMLDialogElement | null>

  constructor() {
    this.dialogState = ref(false)
    this.contentElement = ref(null)
  }

  /**
   * Triggers the dialog state and manages the display/hide of the dialog content.
   *
   * @param payload - Payload object for controlling the dialog state.
   */
  public useDialogController(payload: DialogPayload): void {
    this.dialogState.value = payload.show

    this.contentElement.value = document.getElementById(`${payload.content}-dialog`) as HTMLDialogElement

    if (this.contentElement.value) {
      if (!this.contentElement.value.open) {
        this.contentElement.value.showModal()
      }
      else {
        this.contentElement.value.close()
        this.contentElement.value = null
      }
    }
  }
}
