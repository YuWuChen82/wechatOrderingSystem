import { reactive } from 'vue'
export default function useDialog() {
    const dialog = reactive({
        title: '新增',
        visible: false,
        width: 600,
        height: 300,
    })
    const onClose = () => {
        dialog.visible = false;
    }
    const onConfirm = () => {
        dialog.visible = true;
    }
    const onShow = () => {
        dialog.visible = true
    }
    return { dialog, onClose, onConfirm, onShow }
}