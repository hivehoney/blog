import {useEffect, useState} from "react";
import CKEDITOR from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import styles from '../../assets/App.css';

export default function Editor() {
    useEffect(() => {
        const editorConfig = {
            content: document.getElementById('content'),
        };

        CKEDITOR.MultiRootEditor
            .create(editorConfig, {
                simpleUpload: {
                    uploadUrl: 'http://localhost:8080/notice/imgUpload',
                    withCredentials: true,
                    headers: {
                        'X-CSRF-TOKEN': 'CSRF-Token',
                        Authorization: 'Bearer <JSON Web Token>'
                    }
                }
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
