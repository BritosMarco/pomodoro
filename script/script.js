let acao = document.getElementById('acao');
let pausa = document.getElementById('pausa');
let sessoes = document.getElementById('sessoes')
let segundos

var bell = new Audio("./audio/audio_bell.mp3");
var volta = new Audio("./audio/audio_volta.mp3");
var final = new Audio("./audio/audio_final.mp3");

let lofi = document.getElementById('lofi');
var play = document.getElementById('play');
var pause = document.getElementById('pause');

function pausar(){
    lofi.pause();
    play.style.setProperty('display', 'block', 'important');
    pause.style.setProperty('display', 'none', 'important');
    
} 

function executar(){
    lofi.play()
    play.style.setProperty('display', 'none', 'important');
    pause.style.setProperty('display', 'block', 'important');
} 

function iniciar(){
    if(acao.value == 0){
        document.getElementById('erro_acao').innerHTML="Adicione os minutos"; //InnerHTML adiciona um texto ao erro_acao
        acao.focus()
    }else if(pausa.value == 0){
        document.getElementById('erro_pausa').innerHTML="Adicione a Pausa"; //InnerHTML adiciona um texto ao erro_acao
        pausa.focus()
    }else if(sessoes.value == 0){
        document.getElementById('erro_sessoes').innerHTML="Adicione as sessões";
        sessoes.focus()
    }else{
        lofi.play()
        pause.style.setProperty('display', 'block', 'important'); //habilita o botão pause na hora que inicia a musica
        localStorage.setItem('acao', String(acao.value));
        localStorage.setItem('pausa', String(pausa.value));
        localStorage.setItem('sessoes', String(sessoes.value)); 

        document.getElementById('config').style.setProperty('display', 'none', 'important')
        document.getElementById('timer').style.setProperty('display', 'block', 'important')

        momentoAcao()
    }
}

function momentoAcao(){
        let sessoes_valor = localStorage.getItem('sessoes');

        if(sessoes_valor != '1'){
            document.getElementById('title_sessao').innerHTML = sessoes_valor + ' Sessões restante'
        }else{
            document.getElementById('title_sessao').innerHTML = sessoes_valor + ' Sessão restante'
        }

        let title = document.getElementById('title')
        title.innerHTML = "Concentração Total"
        title.style.fontSize = '18pt'
        title.style.fontWeight = 'bold'
        title.style.setProperty('color', '#28a745', 'important')

        min = Number(localStorage.getItem('acao'))
        min = min-1
        segundos = 59
        document.getElementById('minutes_ok').innerText = min
        document.getElementById('seconds_ok').innerText = segundos

        var min_interval = setInterval(minTimer, 60000);
        var seg_interval = setInterval(segTimer, 1000);

        function minTimer(){
            min = min-1
            document.getElementById('minutes_ok').innerText = min
        }

        function segTimer(){
            segundos = segundos -1
            document.getElementById('seconds_ok').innerText = segundos
            if (segundos <=0){
                if(min <= 0){
                    clearInterval(min_interval);
                    clearInterval(seg_interval);

                    bell.play()
                    momentoPausa()
                }
                segundos = 60
            }
        }

}

function momentoPausa(){
    let title = document.getElementById('title')
        title.innerHTML = "Hora da Pausa"
        title.style.fontSize = '25pt'
        title.style.fontWeight = 'bold'
        title.style.setProperty('color', '#dc3545', 'important')

        min_pausa = Number(localStorage.getItem('pausa'))
        min_pausa = min_pausa-1
        segundos = 59

        document.getElementById('minutes_ok').innerText = min_pausa
        document.getElementById('seconds_ok').innerText = segundos

        var min_interval = setInterval(minTimer, 60000);
        var seg_interval = setInterval(segTimer, 1000);

        
        function minTimer(){
            min_pausa = min_pausa-1
            document.getElementById('minutes_ok').innerText = min_pausa
        }

        function segTimer(){
            segundos = segundos -1
            document.getElementById('seconds_ok').innerText = segundos
            if (segundos <=0){
                if(min_pausa <= 0){
                    ses = Number(localStorage.getItem('sessoes'))
                    ses = ses-1
                    localStorage.setItem('sessoes', String(ses)); 

                    clearInterval(min_interval);
                    clearInterval(seg_interval);

                    if(ses <= 0){
                        final.play()
                        localStorage.clear()
                        document.getElementById('config').style.setProperty('display', 'none', 'important')
                        document.getElementById('timer').style.setProperty('display', 'none', 'important')
                        document.getElementById('fim').style.setProperty('display', 'block', 'important')
                        clearInterval(min_interval);
                        clearInterval(seg_interval);
                    }else{
                        volta.play()
                        momentoAcao()
                    }

                    
                
                }
                segundos = 60
            }
        }

}
