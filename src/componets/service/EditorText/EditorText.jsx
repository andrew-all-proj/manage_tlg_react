import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import LinkInput from './InputLink'
import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

import { FORMAT_TEXT_COMMAND } from "lexical";
import AutoLinkPlugin from './AutoLinkPlugin'
import { useState, useEffect, useMemo, useCallback } from "react";
import { Emoji } from './Emoji'
import Theme from "./theme"
import { style } from './style.css';

import { $generateHtmlFromNodes } from '@lexical/html';
import { $getRoot, $getSelection, $insertNodes, $createParagraphNode, $createTextNode } from 'lexical';

export default function LexicalEditor({ getText, setGetText, textPost, setTextPost }) {
    const config = {
        namespace: 'lexical-editor',
        theme: Theme,
        onError: error => {
            console.log(error);
        },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode
        ]
    }

    return (
        <LexicalComposer initialConfig={config}>
            <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2, m: 1 }}>
                <Toolbar getText={getText} setGetText={setGetText} textPost={textPost} setTextPost={setTextPost} />
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <LinkPlugin />
                <AutoLinkPlugin />
                <HistoryPlugin />
                <Emoji />
            </Box>
        </LexicalComposer>
    );
}


const Toolbar = ({ getText, setGetText, textPost, setTextPost }) => {
    const [showInputLink, setShowInputLink] = useState(false);
    const [showInputBold, setShowInputBold] = useState(false);
    const [showInputItalic, setShowInputItalic] = useState(false);

    const [insertLink, setInsetLink] = useState('');
    const [editor] = useLexicalComposerContext();

    function removeTags(html) {
        html = html.replace(/<\/?p[^>]*>/gi, "");      // Удаляем теги <p> и </p>
        html = html.replace(/<\/?span[^>]*>/gi, "");   // Удаляем теги <span> и </span>
        html = html.replace(/<\/?strong[^>]*>/gi, ""); // Удаляем теги <strong> и </strong>
        html = html.replace(/<\/?em[^>]*>/gi, "");     // Удаляем теги <em> и </em>
        html = html.replace(/<\/?br[^>]*>/gi, "");     // Удаляем теги <br> и </br>
        html = html.replace(/\s*rel="noopener"/gi, "");// Удаляем rel="noopener"
        html = html.replace(/\s*class="editor-link"/gi, "");// Удаляем class="editor-link"

        return html.trim();
    }

    // Получает данные при открытие сохраненого текста поста
    useEffect(() => {
        editor.update(() => {
            // In the browser you can use the native DOMParser API to parse the HTML string.
            const parser = new DOMParser();
            const dom = parser.parseFromString(textPost, "text/html");
            // Once you have the DOM instance it's easy to generate LexicalNodes.
            const nodes = $generateNodesFromDOM(editor, dom);
            // Select the root
            $getRoot().select();
            // Insert them at a selection.
            $insertNodes(nodes);
        });
    }, []);


    useEffect(() => {
        if (getText) {
            editor.update(() => {
                const editorState = editor.getEditorState();
                const jsonString = JSON.stringify(editorState);
                const htmlString = $generateHtmlFromNodes(editor);
                console.log('htmlString', htmlString);
                //setTextPost(removeTags(htmlString))
                console.log(removeTags(htmlString));
                setTextPost(removeTags(htmlString))
            });
        }
    }, [getText]);

    useEffect(() => {
        if (insertLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, insertLink);
            setInsetLink("");
        }
    }, [insertLink]);

    const handleInsertLink = (event) => {
        setShowInputLink(event.currentTarget);
    };

    const handleFormatText = (type) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
        if (type === 'italic') {
            if (!showInputItalic) {
                setShowInputItalic(true)
            } else {
                setShowInputItalic(false)
            }
        }
        if (type === 'bold') {
            if (!showInputBold) {
                setShowInputBold(true)
            } else {
                setShowInputBold(false)
            }
        }
    };


    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <LinkInput showInputLink={showInputLink} setShowInputLink={setShowInputLink} setInsetLink={setInsetLink} />
            <IconButton onClick={() => handleFormatText('italic')} aria-label="delete" size="large">
                <FormatItalicIcon fontSize="default" color={showInputItalic ? "primary" : "disabled"} />
            </IconButton>

            <IconButton onClick={() => handleFormatText('bold')} aria-label="delete" size="large">
                <FormatBoldIcon fontSize="default" color={showInputBold ? "primary" : "disabled"} />
            </IconButton>

            <IconButton onClick={handleInsertLink} aria-label="delete" size="large">
                <InsertLinkIcon fontSize="default" color={"primary"} />
            </IconButton>

        </Box>
    )
}

function Placeholder() {
    return <div className="editor-placeholder">Введите текст...</div>;
}