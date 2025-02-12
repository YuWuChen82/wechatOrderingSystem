/// <reference types="vite/client" />
/// <reference types="node" />
declare module '@wangeditor/editor-for-vue';

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}