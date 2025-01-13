"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/creditos.css';
import { AUDIO_PATHS } from '../../constant/audio';

const Creditos = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('back-home').style.display = 'block';
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    router.push('/'); 
  };

  return (
    <>
      <div className="wrapper">
        <div className="video_title">T.I QUIZZMASTER</div>

        <div className="job_title">directed by</div>
        <div className="person_name">Panela</div>

        <div className="job_title">produced by</div>
        <div className="person_name">Alejandro Estevan</div>
        <div className="person_name">Jean Honorio</div>
        <div className="person_name">João Marcos</div>
        <div className="person_name">Julio Cezar</div>
        <div className="person_name">Lucas Davi</div>
        <div className="person_name">Lucas Ramos</div>
        <div className="person_name">Kerven Kildhery</div>
        <div className="person_name">Weslley Pereira</div>

        <div className="job_title">Front-End</div>
        <div className="person_name">João Marcos</div>
        <div className="person_name">Lucas Davi</div>

        <div className="job_title">director of photography</div>
        <div className="person_name">Não Temos</div>

        <div className="job_title">Back-End</div>
        <div className="person_name">João Marcos</div>
        <div className="person_name">Julio Cezar</div>
        <div className="person_name">Lucas Ramos</div>
        <div className="person_name">Weslley Pereira</div>
        <div className="person_name">Jean Honorio</div>

        <div className="job_title">Agradecimentos</div>
        <div className="person_name">João Marcos</div>
        <div className="person_name">João Marcos</div>
        <div className="person_name">João Marcos</div>
        <div className="person_name">Sou foda</div>

        <div className="job_title">Agradecimentos Especiais</div>
        <div className="person_name">ChatGPT</div>
        <div className="person_name">Github Copilot</div>

        <div className="job_title">story</div>
        <div className="person_name">
          <img
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/64d44235-1dee-4bca-95da-bee1ee96eea3-profile_image-300x300.png"
            alt=""
          />
        </div>

        <div className="person_name">
          Agora fique escutando essa bela música enquanto os créditos são repetidos
        </div>
        <div className="job_title"></div>

        <audio className="background-audio" loop autoPlay>
          <source src={AUDIO_PATHS.CREDIT_SONG} type="audio/mpeg" />
        </audio>
      </div>

      <a id="back-home" href="#" onClick={handleSkip} style={{ display: 'none' }}>
        PULAR
      </a>
    </>
  );
};

export default Creditos;