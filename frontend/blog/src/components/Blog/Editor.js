import { useEffect } from "react";
import CKEDITOR from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import styles from '../../assets/App.css';
import {Container, CssBaseline} from "@mui/material";
export default function Editor() {
    useEffect(() => {
        const editorConfig = {
            header: document.getElementById('header'),
            content: document.getElementById('content'),
        };

        CKEDITOR.MultiRootEditor
            .create(editorConfig)
            .then( editor => {
                window.editor = editor;

                // Append toolbar to a proper container.
                const toolbarContainer = document.getElementById( 'page-header' );
                toolbarContainer.appendChild( editor.ui.view.toolbar.element );

                // Make toolbar sticky when the editor is focused.
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
            <div className="editor">
                <div id="header">
                    <p>제목</p>
                </div>
            </div>
            <div className="editor">
                <div id="content">
                    <p>본문</p>
                </div>
            </div>
        </>
    )
}
