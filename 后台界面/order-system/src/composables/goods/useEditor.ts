import { onBeforeUnmount, ref, shallowRef, } from 'vue'
import { IEditorConfig } from '@wangeditor/editor'
export default function useEditor() {
    type InsertFnType = (url: string, alt?: string, href?: string) => void
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const mode = ref('default')
    // 内容 HTML
    const valueHtml = ref('')
    const toolbarConfig = {}
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...', MENU_CONF: {},
    }
    //上传图片的配置
    editorConfig.MENU_CONF!['uploadImage'] = {
        // from-data fieldName ,"默认值" 'wangeditor-upload-image'
        fieldName: 'file',
        // 上传图片后端地址
        server: process.env.BASE_API + '/api/upload/uploadImage',
        //自定义插入图片
        customInsert(res: any, insertFn: InsertFnType) {
            //res 即服务端的返回结果
            console.log(res);
            //从 res中找到url alt href ,然后插图图片
            insertFn(process.env.BASE_API + res.data)

        }
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor: any) => {
        editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
        editorRef,
        valueHtml,
        mode, // 或 'simple'
        toolbarConfig,
        editorConfig,
        handleCreated
    };
}