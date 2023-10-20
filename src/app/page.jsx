'use client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react';

import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';

export default function Home() {
  const [link, changeLink] = useState('');
  const [qrcodeLink, setQrcodeLink] = useState('');

  function generateLink(url) {
    const config = {
      windth: 800,
      margin: 3
    }

    QRCodeLink.toDataURL(url, config, (err, url) => {
      if(err) console.error(err);
      setQrcodeLink(url)
    });
  }

  function generateQRCode(event) {
    changeLink(event.target.value);
    generateLink(event.target.value);
  }

  return (
    <main>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
          <div className="container d-flex flex-column justify-content-center align-items-center">

            <div id="qrcode">
              <QRCode value={link}/>
            </div>

            <hr className='mt-4 mb-4' style={{ opacity: '0%' }}/>

            <div className='container' id="form">
              <form className='form container d-flex flex-column justify-content-center align-items-center'>
                <label className="form-label" htmlFor="input"></label>
                <input
                  className="form-control"
                  id="input"
                  type="text"
                  placeholder='Digit your link here ...'
                  value={link}
                  onChange={(e) => generateQRCode(e)}
                  style={{ maxWidth: '400px' }}
                />
                <hr className='mt-3 mb-2' style={{ opacity: '0%' }}/>
                <a className='btn btn-primary container-fluid' style={{ maxWidth: '400px' }} href={qrcodeLink} download={`qrcode.png`}>Download QRCode</a>
              </form>
            </div>

          </div>
        </div>
    </main>
  )
}
