'use client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';

export default function Home() {
  const [link, changeLink] = useState('');
  const [scale, changeScale] = useState(4);
  const [size, changeSize] = useState(600);
  const [margin, changeMargin] = useState(4);
  const [version, changeVersion] = useState(2);
  const [name, changeName] = useState('qrcode');
  const [qrcodeLink, setQrcodeLink] = useState('');
  const [format, changeFormat] = useState('image/png');

  function generateLink(url) {
    const config = {
      scale: Number(scale),
      windth: Number(size),
      margin: Number(margin),
      version: Number(version),
      format: format,
    };

    QRCodeLink.toDataURL(url, config, (err, url) => {
      if(err) console.error(err);
      setQrcodeLink(url)
    });
  }

  useEffect(() => {
    generateLink(link);
  }, [size, link, name, margin, scale, version, format]);



  return (
    <main className='container-fluid'>
      <div className='container d-flex flex-column align-items-center justify-content-center'>

        <hr className='mt-5' style={{ opacity: '0%' }}/>

        <div>
          <QRCode value={link} style={{ height: "auto", maxWidth: "100%", width: "100%" }} size={256} viewBox={`0 0 256 256`}/>
        </div>

        <hr className='mt-5 mb-5' />

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-3 text-secondary">
            <label htmlFor="size">Size(px):</label>
            <input  className="form-control" type="number" id='size' value={size} onChange={(e) => changeSize(e.target.value)} autoComplete="off"/>
          </div>

          <div className="col-12 col-md-3 text-secondary">
            <label htmlFor="margin">Margin(px):</label>
            <input  className="form-control" type="number" id='margin' value={margin} onChange={(e) => changeMargin(e.target.value)} autoComplete="off"/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="scale">Scale:</label>
            <input  className="form-control" type="number" id='scale' value={scale} onChange={(e) => changeScale(e.target.value)} autoComplete="off"/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-3 text-secondary">
              <label htmlFor="version">Version:</label>
              <select className="form-select" aria-label="version" id='version' value={version} onChange={(e) => changeVersion(e.target.value)} autoComplete="off">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>

          <div className="col-12 col-md-3 text-secondary">
            <label htmlFor="format">Format:</label>
            <select className="form-select" aria-label="format" id="format" value={format} onChange={(e) => changeFormat(e.target.value)} disabled>
              <option value="image/png">.png</option>
              <option value="image/jpeg">.jpeg</option>
              <option value="image/webp">.webp</option>
            </select>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="name">File name:</label>
            <input className="form-control" type="text" id='name' value={name} onChange={(e) => changeName(e.target.value)} autoComplete="off"/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="link">QRCode link:</label>
            <input className="form-control" type="text" id='link' value={link} onChange={(e) => changeLink(e.target.value)} autoComplete="off"/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <a className='btn btn-primary container-fluid' href={qrcodeLink} download={`${name}.png`}>Download</a>
          </div>
        </div>

      </div>
    </main>
  )
}
