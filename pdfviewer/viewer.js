////////////////////////////////////////////////

//import React, { Component } from 'react';
import React, { PureComponent } from 'react';
import { Document, Outline, Page } from 'react-pdf';

import '../test.css';

import 'react-pdf/dist/Page/AnnotationLayer.css';

//import {Layout} from './components/layout'

//import {styled} from 'styletron-react';

//const Panel = styled('div', {
//  backgroundColor: 'lightblue',
//  fontSize: '12px'
//});

//<Panel>Hello World</Panel>


//class App extends Component {


/*  
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ pdf, numPages }) => {
    this.setState({ numPages });
  }

  onDocumentLoadSuccess2 = (pdf) => {

    console.log('Loaded a file with ' + pdf.numPages + ' pages!')
    this.setState({numpages: pdf.numPages});
    
  }

  onItemClick = ({ pageNumber }) => this.setState({ pageNumber })

  //onLoadSuccess = (pdf) => console.log('Loaded a file with ' + pdf.numPages + ' pages!')

  render() {

    const { pageNumber, numPages } = this.state;

    return (
    <div className="Test">
      <header>
        <h1>
          react-pdf test page
        </h1>
      </header>
      <div className="Test__container">>
        <Document
           file="test.pdf"
           onLoadSuccess={this.onDocumentLoadSuccess}
           className="custom-classname-document"
        >
           <Outline
              className="custom-classname-outline"
              onItemClick={this.onItemClick}
           />
           <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    </div>
    );
  }
*/  
//}


const options = {
  //cMapUrl: 'cmaps/',
  //cMapPacked: true,
};

class PDF extends PureComponent {
  state = {
    displayAll: false,
    file:   this.props.file, 
    numPages: null,
    pageNumber: null,
    pageScale: 1.5,
    passMethod: 'normal',
    render: true,
    renderAnnotations: true,
    renderInteractiveForms: true,
    renderMode: 'canvas',
    renderTextLayer: true,
    rotate: null,
  }

  onDocumentLoadProgress = (progressData) => {
    console.log('Loading a document', progressData.loaded / progressData.total);
  }

  onDocumentLoadSuccess = (document) => {
    console.log('Loaded a document', document);
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  }

  onPageRenderSuccess = page => console.log('Rendered a page', page);

  onItemClick = ({ pageNumber }) => this.setState({ pageNumber })

  setFile = file => this.setState({ file })

  previousPage = () => this.changePage(-1)

  nextPage = () => this.changePage(1)

  changePage = offset => this.setState(prevState => ({
    pageNumber: (prevState.pageNumber || 1) + offset,
  }))

  get file() {
    const { file } = this.state;

    if (!file) {
      return null;
    }

    const { passMethod } = this.state;

    switch (passMethod) {
      case 'object': {
        if (typeof file === 'string') {
          return {
            url: file,
          };
        }
        return file;
      }
      case 'blob':
        if (file instanceof File || file instanceof Blob) {
          return file;
        }
        return file; //dataURItoBlob(file);
      case 'normal':
      default:
        return file;
    }
  }

  get pageProps() {
    const {
      pageHeight,
      pageScale,
      pageWidth,
      renderAnnotations,
      renderInteractiveForms,
      renderMode,
      renderTextLayer,
    } = this.state;

    return {
      className: 'custom-classname-page',
      height: pageHeight,
      onClick: (event, page) => console.log('Clicked a page', { event, page }),
      onRenderSuccess: this.onPageRenderSuccess,
      renderAnnotations,
      renderInteractiveForms,
      renderMode,
      renderTextLayer,
      scale: pageScale,
      width: pageWidth,
      customTextRenderer: textItem => (
        textItem.str
          .split('ipsum')
          .reduce((strArray, currentValue, currentIndex) => (
            currentIndex === 0
              ? ([...strArray, currentValue])
              : ([...strArray, (
                // eslint-disable-next-line react/no-array-index-key
                <mark key={currentIndex}>
                  ipsum
                </mark>
              ), currentValue])
          ), [])
      ),
    };
  }

  render() {

    const {file} = this.props;

    const {
      displayAll,
      //file, //fileState,
      numPages,
      pageNumber,
      pageScale,
      passMethod,
      render,
      renderAnnotations,
      renderInteractiveForms,
      renderMode,
      renderTextLayer,
      rotate,
    } = this.state;
    const { pageProps } = this;

    const setState = state => this.setState(state);

    const documentProps = {
      file,
      options,
    };

    return (
      <div className="Test">
      
        <header>
          <h1>
            react-pdf test page
          </h1>
        </header>
        <div className="Test__container">
          <aside className="Test__container__options">
            
            
          </aside>
          <main className="Test__container__content">
            <div className="Test__container__content__toc">
              {render && (
                <Document
                  {...documentProps}
                  file={file}
                  className="custom-classname-document"
                >
                  <Outline
                    className="custom-classname-outline"
                    onItemClick={this.onItemClick}
                  />
                </Document>
              )}
            </div>
            <div className="Test__container__content__document">
              {render && (
                <Document
                  {...documentProps}
                  file={file}
                  className="custom-classname-document"
                  onItemClick={this.onItemClick}
                  onClick={(event, pdf) => console.log('Clicked a document', { event, pdf })}
                  onLoadProgress={this.onDocumentLoadProgress}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  onLoadError={this.onDocumentLoadError}
                  onSourceError={this.onDocumentLoadError}
                  rotate={rotate}
                  pagescale={pageScale}
                >
                  {
                    displayAll
                      ? Array.from(
                        new Array(numPages),
                        (el, index) => (
                          <Page
                            {...pageProps}
                            inputRef={
                              (pageNumber === index + 1)
                                ? (ref => ref && ref.scrollIntoView())
                                : null
                            }
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                          />
                        ),
                      )
                      : (
                        <Page
                          {...pageProps}
                          pageNumber={pageNumber || 1}
                        />
                      )
                  }
                </Document>
              )}
            </div>
            {displayAll || (
              <div className="Test__container__content__controls">
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
            )}
          </main>
        </div>
      </div>
    );
  }
}


export default PDF;