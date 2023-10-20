'use client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react';

import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';

export default function Home() {
  const [link, changeLink] = useState('');
  const [name, changeName] = useState('qrcode');
  const [qrcodeLink, setQrcodeLink] = useState('');

  function generateLink(url) {
    QRCodeLink.toDataURL(url, {}, (err, url) => {
      if(err) console.error(err);
      setQrcodeLink(url)
    });
  }

  function generateQRCode(e) {
    changeLink(e.target.value);
    generateLink(e.target.value);
  };

  return (
    <main className='container-fluid'>
      <div className='container d-flex flex-column align-items-center justify-content-center'>

        <hr className='mt-5' style={{ opacity: '0%' }}/>

        <div>
          <QRCode value={link}/>
        </div>

        <hr className='mt-3 mb-3' />

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="name">File name:</label>
            <input className="form-control" id='name' type="text" value={name} onChange={(e) => changeName(e.target.value)} autoComplete='off'/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="link">QRCode link:</label>
            <input className="form-control" id='link' type="text" value={link} onChange={(e) => generateQRCode(e)} autoComplete='off'/>
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
