import {API} from "../../config";

export default class UploadAdapter {

    constructor(loader, postCode) {
        this.loader = loader;
        this.postCode = postCode;
    }

    upload() {
        return this.loader.file.then( file => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( file );
        })))
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', `${API.IMGUPLOAD}`, true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = '파일을 업로드 할 수 없습니다.'

        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.response)

            if(!response || response.error || response.status != 200) {
                return reject( response && response.status != 200 ? response.message : genericErrorText );
            }

            resolve({
                default: `${API.IMGURL}` + response.data.url
            })
        })
    }

    _sendRequest(file) {
        const data = new FormData()
        data.append('upload', file)
        data.append('postCode', this.postCode)
        this.xhr.send(data)
    }
}