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
  const [name, changeName] = useState('qrcode');
  const [qrcodeLink, setQrcodeLink] = useState('');

  function generateLink(url) {
    const config = {
      scale: Number(scale),
      windth: Number(size),
      margin: Number(margin),
    };

    QRCodeLink.toDataURL(url, config, (err, url) => {
      if(err) console.error(err);
      setQrcodeLink(url)
    });
  }

  useEffect(() => {
    generateLink(link);
  }, [size, link, name, margin, scale]);



  return (
    <main className='container-fluid'>
      <div className='container d-flex flex-column align-items-center justify-content-center'>

        <hr className='mt-5' style={{ opacity: '0%' }}/>

        <div>
          <QRCode value={link}/>
        </div>

        <hr className='mt-5 mb-5' />

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-3 text-secondary">
            <label htmlFor="size">Size(px):</label>
            <input  className="form-control" type="number" id='size' value={size} onChange={(e) => changeSize(e.target.value)}/>
          </div>

          <div className="col-12 col-md-3 text-secondary">
            <label htmlFor="margin">Margin(px):</label>
            <input  className="form-control" type="number" id='margin' value={margin} onChange={(e) => changeMargin(e.target.value)}/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="scale">Scale:</label>
            <input  className="form-control" type="number" id='scale' value={scale} onChange={(e) => changeScale(e.target.value)}/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="name">File name:</label>
            <input className="form-control" type="text" id='name' value={name} onChange={(e) => changeName(e.target.value)}/>
          </div>
        </div>

        <div className='row container justify-content-center p-2'>
          <div className="col-12 col-md-6 text-secondary">
            <label htmlFor="margin">QRCode link:</label>
            <input className="form-control" type="text" id='margin' value={link} onChange={(e) => changeLink(e.target.value)}/>
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
