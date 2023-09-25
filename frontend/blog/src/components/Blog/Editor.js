import {useEffect} from "react";
import CKEDITOR from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import styles from '../../assets/App.css';
import UploadAdapter from "../../common/utils/UploadAdapter";

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
    }
}

export default function Editor() {
    useEffect(() => {
        const editorConfig = {
            content: document.getElementById('content'),
        };

        CKEDITOR.MultiRootEditor
            .create(editorConfig, {
                extraPlugins: [MyCustomUploadAdapterPlugin]
            })
            .then( editor => {
                window.editor = editor;

                if (document.querySelector('[role="toolbar"]')) {
                    document.querySelector('[role="toolbar"]').remove();
                }

                const toolbarContainer = document.getElementById('page-header');
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                editor.ui.focusTracker.on( 'change:isFocused', () => {
                    if ( editor.ui.focusTracker.isFocused ) {
                        toolbarContainer.classList.add( 'sticky' );
                    } else {
                        toolbarContainer.classList.remove( 'sticky' );
                    }
                } );
            } )
            .catch( error => {
                console.error( 'There was a problem initializing the editor.', error );
            } );
    }, []);

    return (
        <>
            <div className={styles}>
                <div className="editor">
                    <div id="content">
                        <p>본문</p>
                    </div>
                </div>
            </div>
        </>
    )
}
