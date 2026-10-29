import { useLayoutEffect, useRef, type ClipboardEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { useTranslation } from 'react-i18next';

interface PlayerNotesEditorProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const sanitizeNotesHtml = (html: string) => {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const sanitized = document.createElement('div');
  const allowedTags = new Set(['B', 'BR', 'DIV', 'EM', 'I', 'LI', 'OL', 'P', 'S', 'STRIKE', 'STRONG', 'U', 'UL']);

  const copySafeNodes = (source: ParentNode, target: ParentNode) => {
    source.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        target.appendChild(document.createTextNode(node.textContent ?? ''));
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const element = node as Element;
      if (!allowedTags.has(element.tagName)) {
        copySafeNodes(element, target);
        return;
      }

      const safeElement = document.createElement(element.tagName.toLowerCase());
      copySafeNodes(element, safeElement);
      target.appendChild(safeElement);
    });
  };

  copySafeNodes(parsed.body, sanitized);
  return sanitized.innerHTML;
};

const PlayerNotesEditor = ({ value, placeholder, onChange }: PlayerNotesEditorProps) => {
  const { t } = useTranslation();
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmittedValue = useRef<string | null>(null);

  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor || value === lastEmittedValue.current) {
      return;
    }

    const safeValue = sanitizeNotesHtml(value);
    if (editor.innerHTML !== safeValue) {
      editor.innerHTML = safeValue;
    }
    lastEmittedValue.current = safeValue;
  }, [value]);

  const saveEditorValue = () => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    const safeValue = sanitizeNotesHtml(editor.innerHTML);
    if (editor.innerHTML !== safeValue) {
      editor.innerHTML = safeValue;
    }
    lastEmittedValue.current = safeValue;
    onChange(safeValue);
  };

  const applyCommand = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false);
    saveEditorValue();
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const clipboardHtml = event.clipboardData.getData('text/html');
    const safeHtml = clipboardHtml ? sanitizeNotesHtml(clipboardHtml) : '';
    const selection = document.getSelection();
    if (!selection?.rangeCount) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) {
      return;
    }

    range.deleteContents();

    let lastInsertedNode: Node | null = null;
    if (clipboardHtml) {
      const template = document.createElement('template');
      template.innerHTML = safeHtml;
      lastInsertedNode = template.content.lastChild;
      range.insertNode(template.content);
    } else {
      const pastedText = event.clipboardData.getData('text/plain');
      const textNode = document.createTextNode(pastedText);
      lastInsertedNode = textNode;
      range.insertNode(textNode);
    }

    if (lastInsertedNode) {
      range.setStartAfter(lastInsertedNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    saveEditorValue();
  };

  const toolbarActions = [
    { command: 'bold', label: t('fallOfAvalon.playerNotes.bold', 'Bold'), icon: <FormatBoldIcon /> },
    { command: 'italic', label: t('fallOfAvalon.playerNotes.italic', 'Italic'), icon: <FormatItalicIcon /> },
    { command: 'underline', label: t('fallOfAvalon.playerNotes.underline', 'Underline'), icon: <FormatUnderlinedIcon /> },
    { command: 'insertUnorderedList', label: t('fallOfAvalon.playerNotes.bulletedList', 'Bulleted list'), icon: <FormatListBulletedIcon /> },
    { command: 'insertOrderedList', label: t('fallOfAvalon.playerNotes.numberedList', 'Numbered list'), icon: <FormatListNumberedIcon /> },
    { command: 'removeFormat', label: t('fallOfAvalon.playerNotes.clearFormatting', 'Clear formatting'), icon: <FormatClearIcon /> }
  ];

  return (
    <div className="player-notes-editor">
      <div className="player-notes-toolbar" role="toolbar" aria-label={t('fallOfAvalon.playerNotes.formatting', 'Text formatting')}>
        {toolbarActions.map(({ command, label, icon }) => (
          <Tooltip title={label} key={command}>
            <IconButton
              aria-label={label}
              size="small"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => applyCommand(command)}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </div>
      <div
        ref={editorRef}
        className="player-notes-content"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label={t('fallOfAvalon.playerNotes.title', 'Player Notes')}
        aria-placeholder={placeholder}
        aria-multiline="true"
        data-placeholder={placeholder}
        spellCheck
        onInput={saveEditorValue}
        onPaste={handlePaste}
      />
    </div>
  );
};

export default PlayerNotesEditor;
