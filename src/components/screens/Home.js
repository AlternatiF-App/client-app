import React from 'react'
import '../../App.css'
import img1 from '../../assets/img/05.jpg'
import img2 from '../../assets/img/06.jpg'
import img3 from '../../assets/img/03.jpg'

export default function Home() {

    return (
        <>
        <div className="section sec-1-wrap no-pad-bot" id="index-banner">
            <div className="container">
                <div className="row center bg-text">
                    <h1 className="header center black-text head-text">Klasifikasi Siswa</h1>
                    <h5 className="header center black-text head-text">Menentukan kelas ekstrakurikuler olimpiade untuk siswa.</h5>
                    <a id="download-button" className="btn-large waves-effect waves-light black">Get Started</a>
                </div>
            </div>
        </div>


        <div className="container">
            <div className="section">
            <div className="row">
                <div className="col s12 m4">
                    <div className="icon-block">
                        <h2 className="center light-blue-text">
                            <img className="ava-img" src={img1}/>
                        </h2>
                        <h5 className="center">Kepala Madrasah</h5>

                        <p className="light  center">Uswida,S. Pd</p>
                    </div>
                </div>

                <div className="col s12 m4">
                    <div className="icon-block">
                        <h2 className="center light-blue-text">
                            <img className="ava-img" src={img2}/>
                        </h2>
                        <h5 className="center">Waka Kesiswaan</h5>

                        <p className="light  center">Yuniswatin Choiroh,S. Pd</p>
                    </div>
                </div>

                <div className="col s12 m4">
                    <div className="icon-block">
                        <h2 className="center light-blue-text">
                            <img className="ava-img" src={img3}/>
                        </h2>
                        <h5 className="center">Waka Kurikulum</h5>

                        <p className="light  center">Halimatus Sa'diyah,S. Pd. I</p>
                    </div>
                </div>
            </div>

            </div>
            <br/><br/>
        </div>

        <footer className="page-footer black">
            <div className="container">
            <div className="row">
                <div className="col l6 s12">
                <h5 className="white-text">MI Ash - Shodiq</h5>
                <p className="grey-text text-lighten-4">Salah satu Madrasah di Kecamatan Bululawang. Banyak kelas ekstrakurikuler disini, dan salah  satunya kelas olimpiade yang mencakup Matematika, IPA dan Bahasa Indonesia.</p>
                </div>
                <div className="col l6 s12">
                <h5 className="white-text">Menu</h5>
                    <FooterMenu/>
                </div>
            </div>
            </div>
            <div className="footer-copyright">
            <div className="container">
            Made by <a className="orange-text text-lighten-3">AlternatiF</a>
            </div>
            </div>
        </footer>
        </>
    )
}

const FooterMenu = () => {
    const username = localStorage.getItem("user")
    if(username === "admin"){
        return(
            <ul>
                <li><a className="white-text" href="#!">Siswa</a></li>
                <li><a className="white-text" href="#!">Pengguna</a></li>
                <li><a className="white-text" href="#!">Minat</a></li>
                <li><a className="white-text" href="#!">Tentang</a></li>
                <li><a className="white-text" href="#!">Bantuan</a></li>
            </ul>
        )
    }else{
        return(
            <ul>
                <li><a className="white-text" href="#!">Siswa</a></li>
                <li><a className="white-text" href="#!">Tentang</a></li>
                <li><a className="white-text" href="#!">Bantuan</a></li>
            </ul>
        )
    }
}