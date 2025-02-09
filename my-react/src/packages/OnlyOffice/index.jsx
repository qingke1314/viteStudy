import React, { useMemo } from 'react'
import { useState, useEffect, useContext, createContext } from 'react'
import { DocumentEditor } from "@onlyoffice/document-editor-react";

function OnlyOffice() {
  /**
   * 加载初始化回调
   * @param {*} event
   */
  const onDocumentReady = function (event) {
    console.log("Document is loaded", event, window.DocEditor);
  };
  /**
   * 错误回调
   * @param {*} errorCode 错误代码
   * @param {*} errorDescription 错误描述
   */
  var onLoadComponentError = function (errorCode, errorDescription) {
    switch(errorCode) {
      case -1: // Unknown error loading component
        console.log(errorDescription);
        break;
      case -2: // Error load DocsAPI from http://documentserver/
        console.log(errorDescription);
        break;
      case -3: // DocsAPI is not defined
        console.log(errorDescription);
        break;
    }
  };
  
  return (
    <div>
      <div onClick={() => { console.log(window) }} style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '16px' }}>OnlyOffice</div>
      <div style={{ height: 'calc(100vh - 170px)', width: '1600px' }}>
        <DocumentEditor
          id="docxEditor"
          documentServerUrl="http://172.28.100.230:8888/"
          config={{
            "document": {
              "fileType": "docx",
              "key": "B143195F47A0",
              "title": "Example Document Title.docx",
              "url": "http://172.28.100.230:8090/Task.docx"
            },
            "documentType": "word",
            "editorConfig": {
              "callbackUrl": null,
              "lang": "zh",
              "user": {
                "id": "66666",
                "name": "REACT_USER"
              },
            },
            width: "100%",
            height: "100%",
          }}
          events_onDocumentReady={onDocumentReady}
          onLoadComponentError={onLoadComponentError}
        />
      </div>
    </div>
  )
}

export default OnlyOffice;