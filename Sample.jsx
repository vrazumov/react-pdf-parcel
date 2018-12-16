import React, { Component } from 'react';
import { Document, Page, Outline } from 'react-pdf/dist/entry.parcel';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import './Sample.less';

import pdfFile from './sample.pdf';

const options = {
  //cMapUrl: 'cmaps/',
  //cMapPacked: true,
};

export default class Sample extends Component {
  state = {
    displayAll: false,
    file: pdfFile,
    numPages: null,
    pageNumber: null,
    scale: 1.5
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }


  //<Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
  //   <Outline />
  //</Document>

  onItemClick = ({ pageNumber }) => this.setState({ pageNumber })

  previousPage = () => this.changePage(-1)

  nextPage = () => this.changePage(1)

  changePage = offset => this.setState(prevState => ({
    pageNumber: (prevState.pageNumber || 1) + offset,
  }))

  render() {
    const { file, numPages, pageNumber, displayAll, scale } = this.state;

    console.log("Page Number", pageNumber);

    return (
      <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Загрузка файла:</label>
            {' '}
            <input
              type="file"
              onChange={this.onFileChange}
            />
          </div>
          <p/>
          <div className="Example__container__content__controls">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={this.previousPage}
          >
            Previous
          </button>
          <span>
              {`Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`}
          </span>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={this.nextPage}
          >
            Next
          </button>
        </div>
          <div>
           <Document
                  className="custom-classname-document"
                  file={file}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  options={options}
                >
                  <Outline
                    className="custom-classname-outline"
                    onItemClick={this.onItemClick}
                  />
                </Document>
              
          </div>
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
            >
              {
                displayAll
                ?
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={scale}
                    />
                  ),
                )
                : (
                  <Page
                    pageNumber={pageNumber || 1}
                    scale={scale}
                  />
                )
              }
              <Outline
                className="custom-classname-outline"
                onItemClick={this.onItemClick}
              />
            </Document>
          </div>

        <div className="Example__container__content__controls">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={this.previousPage}
          >
            Previous
          </button>
          <span>
              {`Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`}
          </span>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={this.nextPage}
          >
            Next
          </button>
        </div>

        </div>
      </div>
    );
  }
}
