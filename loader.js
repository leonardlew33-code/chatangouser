// loader.js
window.addEventListener('load', () => {
 
  // ===============================
  // REMOVE CHATANGO ELEMENTS
  // ===============================
 
  // Remove main wrapper
  const mainWrapper = document.getElementById('fpix_wrapper');
  if (mainWrapper) mainWrapper.remove();
 
  // Remove bottom bar (old bottombar)
  document.querySelectorAll('center').forEach(center => {
    const bar = center.querySelector('.bottombar');
    if (bar) center.remove();
  });
 
  // Remove the new <center> with 625px table
  document.querySelectorAll('center > table[width="625"]').forEach(table => {
    const center = table.closest('center');
    if (center) center.remove();
  });
 
  // Remove all <br> directly in body
  Array.from(document.body.childNodes).forEach(node => {
    if (node.nodeName === 'BR') node.remove();
  });
 
  // ===============================
  // INJECT CUSTOM PROFILE CONTAINER
  // ===============================
 
  const container = document.createElement('div');
  container.id = 'full-profile-container';
  container.innerHTML = `
 <style>
/* ===== BODY ===== */
#full-profile-container {
    margin: 0 !important;
    padding: 0 !important;
}
body {
    margin: 0 !important;
    padding: 0 !important;
    font-family: 'Verdana', sans-serif;
    cursor: url('https://i.imgur.com/bv3mL7T.png'), auto; /* custom cursor */
    color: #fff;
    box-sizing: border-box;
    background: url('https://cdn.wallpapersafari.com/38/2/cXyvkH.jpg') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    overflow-y: auto;
}
 
/* ===== GLOBAL BODY: REMOVE DEFAULT MARGINS & HIDE HORIZONTAL SCROLL ===== */
html, body {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden !important;
}
 
/* ===== HIDE CHATANGO ELEMENTS ===== */
body > font { display: none; }
#fpix_wrapper, #fpix_wrapper + font { display: none; }
#chatango-log { left: 40%; }
 
/* ===== HIDE RADIO INPUTS ===== */
input[name="tab"] { display: none; }
 
/* ===== LEFT TABS ===== */
.tab {
    position: fixed;
    left: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 10px #DA291C;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #140000;
    border: 2px solid #DA291C;
    transition: transform 0.2s;
    z-index: 1000;
}
.tab:hover { transform: scale(1.1); }
 
/* ===== TAB POSITIONS ===== */
#tab-home-label { top: 150px; }
#tab-anti-label { top: 230px; }
#tab-quotes-label { top: 310px; }
#tab-about-label { top: 390px; }
 
/* ===== TAB HOVER LABEL ===== */
.tab-hover-label {
    position: fixed;
    left: 90px;
    font-size: 18px;
    color: #DA291C;
    text-shadow: 0 0 5px #DA291C, 0 0 10px #DA291C, 0 0 20px #DA291C, 0 0 40px #DA291C;
    font-weight: bold;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, top 0.2s;
    z-index: 999;
    white-space: nowrap;
}
 
/* ===== TAB IMAGES ===== */
.tab img { width: 100%; height: 100%; object-fit: cover; }
 
/* ===== SECTIONS ===== */
.section {
    display: none;
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
}
 
/* show section depending on checked input */
#home:checked ~ #home-section,
#anti:checked ~ #anti-section,
#quotes:checked ~ #quotes-section,
#about:checked ~ #about-section {
    display: block;
}
 
/* ===== HEADER & MAIN TEXT ===== */
header img {
    width: 250px;
    animation: pulse 2s infinite alternate;
    display: block;
    margin: 20px auto;      
}
@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}
 
h1, h2 {
    font-size: 47px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0 10px 0;
    color: #ffffff;
    text-shadow: 0 0 5px #DA291C,0 0 10px #DA291C,0 0 20px #DA291C,0 0 40px #DA291C;
    animation: glow 1.5s infinite alternate;
}
 
@keyframes glow {
    0% { text-shadow: 0 0 5px #DA291C,0 0 10px #DA291C,0 0 20px #DA291C,0 0 40px #DA291C; }
    100% { text-shadow: 0 0 10px #DA291C,0 0 20px #DA291C,0 0 30px #DA291C,0 0 60px #DA291C; }
}
 
 
#home-section .home-credits {
    text-align: center;
    font-weight: 500;
    color: #ffffff;
    padding: 10px 20px; /* 10px góra/dół, 20px lewo/prawo */	
    font-size: 16px;
}
 
#home-section .home-credits a {
    color: #ffffff;          
    text-decoration: underline;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff;
    transition: transform 0.2s, text-shadow 0.2s;
}
 
#home-section .home-credits a:hover {
    transform: scale(1.1);  
    text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff;
}
 
/* ===== SKŁAD ===== */
.skład {
    width: 100%;
    border: 5px solid #DA291C;
    border-radius: 20px;
    box-shadow: 0 0 30px #DA291C;
    margin-bottom: 30px;
}
.skład img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    display: block;
}
 
 
/* ===== ANTI-CITY GALLERY ===== */
.anti-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
    justify-content: center;
    gap: 15px;
    row-gap: 40px;
}
.anti-gallery .gallery-item {
    width: 180px;
    height: 180px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 0 10px #ff0000,0 0 20px #ff0000;
    transition: transform 0.2s, box-shadow 0.2s;
}
.anti-gallery .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.anti-gallery .gallery-item:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #ff0000,0 0 30px #ff0000;
}
 
/* ===== QUOTES ===== */
.quotes-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    max-width: 800px;
    margin: 20px auto;
}
.quote-box {
    background-color: rgba(44, 9, 9, 0.425);
    border: 2px solid #ff0000;
    border-radius: 15px;
    padding: 10px 15px;
    color: #fff;
    box-shadow: 0 0 15px #ff0000;
    font-size: 18px;
    line-height: 1.4;
    display: inline-block;
    text-align: center;
    max-width: 100%;
    word-wrap: break-word;
}
.quote-box::before {
    content: "❝";
    font-size: 24px;
    color: #00f6ff;
    margin-right: 5px;
}
 
/* ===== HISTORY ===== */
.about-section {
    width: 80%;
    max-width: 900px;
    margin: 30px auto;
    padding: 25px 30px;
    background: linear-gradient(145deg, rgba(219, 0, 0, 0.158), rgba(219, 0, 0, 0.158));
    border: 3px solid #ff0000;
    border-radius: 20px;
    box-shadow: 0 0 25px #000000;
    color: #ffffff;
    font-size: 20px;
    font-size: 20px;
    text-align: center;
    font-weight: 500;
}
.about-section .about-img-container {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
    margin-top: 20px;
}
.about-section .about-img-wrapper {
    width: 600px;
    border-radius: 15px;
    overflow: hidden;
    border: 3px solid #ff0000;
    box-shadow: 0 0 10px #000000,0 0 20px #000000;
    transition: transform 0.3s, box-shadow 0.3s;
}
.about-section .about-img-wrapper:hover {
    transform: scale(1.03);
    box-shadow: 0 0 15px #000000,0 0 30px #000000;
}
.about-section .about-img-wrapper img {
    width: 100%;
    display: block;
}
/* ===== PIONOWA RAMKA TYLKO DLA PORTRETU ===== */
.about-section .about-img-wrapper.portrait {
    width: 280px;      
    aspect-ratio: 2 / 3; 
}
.about-section .about-img-wrapper.portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
 
/* ===== FOOTER ===== */
footer {
    font-size: 24px;
    margin-bottom:  0;
    padding: 20px 0;
    text-align: center;
    color: #f7f7f7;
    text-shadow: 0 0 5px #DA291C,0 0 10px #DA291C,0 0 20px #DA291C;
    margin: 0 !important;
    padding: 20px 0 !important; /* jeśli chcesz padding */
    display: block;
    line-height: 1 !important;
}
</style>
 
<body>
<!-- ===== RADIO INPUTS ===== -->
<input type="radio" name="tab" id="home" checked>
<input type="radio" name="tab" id="anti">
<input type="radio" name="tab" id="quotes">
<input type="radio" name="tab" id="about">
 
<!-- ===== TAB HOVER LABEL ===== -->
<div id="tab-hover" class="tab-hover-label"></div>
 
<!-- ===== LEFT TABS ===== -->
 
<label class="tab" id="tab-home-label" for="home">
    <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg">
</label>
<label class="tab" id="tab-anti-label" for="anti">
    <img src="https://i.imgur.com/GWILWFn.png">
</label>
<label class="tab" id="tab-quotes-label" for="quotes">
    <img src="https://i.imgur.com/1VNf6qD.jpeg">
</label>
<label class="tab" id="tab-about-label" for="about">
    <img src="https://i.imgur.com/tazBaZA.jpeg">
</label>
 
<!-- ===== HOME SECTION ===== -->
<div id="home-section" class="section">
<header>
<img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg">
</header>
<h1><b>❤️ 𝔊𝔩𝔬𝔯𝔶 𝔊𝔩𝔬𝔯𝔶 𝔐𝔞𝔫 𝔘𝔫𝔦𝔱𝔢𝔡 ❤️</b></h1>
<h2><b><i>🖤 UP THE RED DEVILS 🖤</i></b></h2>
<div style="height: 25px;"></div>
 
<div class="skład">
<img src="https://i.imgur.com/mvh3EAp.png">
</div>
 
<footer>Old Trafford • Since 1878</footer>
<!-- Credits -->
  <h3 class="home-credits">
  Inspired and helped with this profile -
  <a href="https://antymadridista.chatango.com" target="_blank">AntyMadridista</a>
</h3>
</div>
 
 
<!-- ===== ANTI-CITY SECTION ===== -->
<div id="anti-section" class="section">
<div class="anti-gallery">
    <div class="gallery-item"><img src="https://i.imgur.com/WKmYk7D.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/DiuvZcR.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/0eIvIUS.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/3CXT98R.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/VBrau96.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/wrnTeD8.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/itwK0rC.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/OxMFGNn.jpeg" alt=""></div>
    <div class="gallery-item"><img src="https://i.imgur.com/ZPZHPMN.png" alt=""></div>
</div>
</div>
 
<!-- ===== QUOTES SECTION ===== -->
<div id="quotes-section" class="section">
<div class="quotes-section">
    <div class="quote-box">🚨🎙️ “Hard work will always overcome natural talent.” – Sir Alex Ferguson</div>
    <div class="quote-box">🚨🎙️ “Football, bloody hell.” – Sir Alex Ferguson</div>
    <div class="quote-box">🚨🎙️ "When the seagulls follow the trawler, it's because they think sardines will be thrown into the sea. Thank you very much." – Eric Cantona</div>
    <div class="quote-box">🚨🎙️ “There's a reason that God gave us two ears, two eyes and one mouth. It's so you can listen and watch twice as much as you talk.” – Sir Alex Ferguson</div>
    <div class="quote-box">🚨🎙️ “And Solskjaer has won it!” – Clive Tyldesley</div>
    <div class="quote-box">🚨🎙️ “Attack wins you games, defence wins you titles.” – Sir Alex Ferguson</div>
    <div class="quote-box">🚨🎙️ "When you first walk into that ground... you fall in love with that team running out in that red shirt... it's an addiction you have for life." — Gary Neville</div>
    <div class="quote-box">🚨🎙️ "I never wanted Manchester United to be second to anybody. Only the best would be good enough." — Sir Matt Busby</div>
    <div class="quote-box">🚨🎙️ "Manchester United is not just a club, it's a religion." – Eric Cantona</div>
    <div class="quote-box">🚨🎙️"Once you put on the red shirt, you feel the history." – Cristiano Ronaldo</div>
    <div class="quote-box">🚨🎙️"When you play for Manchester United, you play to win everything." – Roy Keane</div>
</div>
</div>
 
<!-- ===== HISTORY SECTION ===== -->
<div id="about-section" class="section">
<div class="about-section">
<h1>History of Manchester United</h1>
<p>Manchester United, założony w 1878 roku, to jeden z najbardziej utytułowanych klubów na świecie. Z legendarnymi menedżerami i gwiazdami, klub zdobywał mistrzostwa Anglii, Puchary i triumfy w Lidze Mistrzów, tworząc historię pełną niezapomnianych zwycięstw i emocji. Klub od zawsze jest symbolem pasji, determinacji i ducha drużynowego, który inspiruje miliony kibiców na całym świecie.</p>
<div style="height:20px;"></div>
<div class="about-img-container">
    <div class="about-img-wrapper"><img src="https://m.media-amazon.com/images/I/81JXTGEyp6L.jpg" alt="Messi"></div>
</div>
</div>
</div>
 
<!-- 1878-1892 -->
 
<div id="about-section" class="section">
<div class="about-section">
<h1>Kolejowe początki (1878–1892)</h1>
<p>Wszystko zaczęło się w sercu <a href="https://justpaste.it/redirect/e97vh/https%3A%2F%2Fpl.wikipedia.org%2Fwiki%2FRewolucja_przemys%C5%82owa" target="_blank">rewolucji przemysłowej</a>. W 1878 roku pracownicy departamentu wagonów i lokomotyw kolei <a href="https://justpaste.it/redirect/e97vh/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLancashire_and_Yorkshire_Railway"target="_blank">Lancashire and Yorkshire Railway</a> założyli zespół <b>Newton Heath LYR FC</b>. Ich pierwsze boisko przy <a href="https://justpaste.it/redirect/e97vh/https%3A%2F%2Fpl.wikipedia.org%2Fwiki%2FNorth%20Road" target="_blank">North Road</a> było dalekie od dzisiejszych standardów – zawodnicy musieli zmagać się z gęstym dymem z pobliskich fabryk i nawierzchnią, która po deszczu przypominała bagnisko.
W tym czasie klub nie przypominał dzisiejszych "Czerwonych Diabłów". Piłkarze występowali w barwach zielono-złotych, a ich głównym celem była rywalizacja z innymi zakładami pracy. Dopiero w 1885 roku klub przeszedł na zawodowstwo, a w 1892 roku, po odcięciu członu "LYR" i uniezależnieniu się od kolei, zyskał status członka założyciela nowej<a href="https://justpaste.it/redirect/e97vh/https%3A%2F%2Fpl.wikipedia.org%2Fwiki%2FFootball_League_First_Division" target="_blank"> Pierwszej Dywizji</a>.
</p><div style="height:20px;"></div>
<div class="about-img-container">
<div class="about-img-wrapper"><img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Newton_Heath_1892-93.jpg" alt="Messi"></div>
<footer>Skład klubowy, ok. 1892r</footer>
</div>
</div>
</div>
 
<!-- 1892-1902 -->
<div id="about-section" class="section">
<div class="about-section">
<h1>Dekada walki i odrodzenia: Pierwsza Dywizja i bankructwo (1892–1902)</h1>
<p>Sportowy debiut w elicie okazał się jednak bolesny. Po dwóch sezonach walki na dnie tabeli, w 1894 roku doszło do kluczowego meczu barażowego o utrzymanie z <a href="https://pl.wikipedia.org/wiki/Liverpool_F.C." target="_blank">Liverpool FC</a>. Porażka 0:2 nie tylko zepchnęła klub do <a href="https://pl.wikipedia.org/wiki/Football_League_Second_Division" target="_blank">Drugiej Dywizji</a> na kolejne osiem lat, ale stała się oficjalnym początkiem trwającej do dziś <a href="https://en.wikipedia.org/wiki/Liverpool_F.C.–Manchester_United_F.C._rivalry" target="_blank">rywalizacji obu miast</a>. Pobyt na zapleczu był dla Newton Heath okresem wegetacji – mimo kilku szans na awans, zespół seryjnie zawodził w decydujących momentach, co doprowadziło do drastycznego spadku zainteresowania kibiców i katastrofy finansowej.
U progu nowego stulecia, w 1901 roku, sytuacja stała się beznadziejna. Klub tonął w długach przekraczających 2600 funtów, co doprowadziło do wydania sądowego <b>nakazu likwidacji</b> i zamknięcia stadionu przez komornika. Wtedy wydarzył się najsłynniejszy zwrot akcji w historii sportu: kapitan drużyny <a href="https://pl.wikipedia.org/wiki/Harry_Stafford" target="_blank">Harry Stafford</a>, zbierając fundusze na ratunek klubu, zgubił swojego psa – bernardyna o imieniu Major. Czworonoga odnalazł zamożny piwowar <a href="https://en.wikipedia.org/wiki/John_Henry_Davies" target="_blank">John Henry Davies</a>, który po rozmowie ze Staffordem zdecydował się spłacić długi i zainwestować w upadający zespół.
Davies postawił jednak twardy warunek: całkowite zerwanie z dotychczasową, robotniczą tożsamością. 24 kwietnia 1902 roku oficjalnie zarejestrowano nazwę <b>Manchester United Football Club</b>, porzucono zielono-złote barwy na rzecz czerwieni i bieli</p>
<div class="about-img-container">
<div class="about-img-wrapper portrait">
    <img src="https://i.imgur.com/y3KQLMT.png" alt="Portret">
</div>
</div>
<footer>John Henry Davies - data portretu nieznana</footer>
</div>
</div>
</div>

<!-- 1902-1911 -->

<div id="about-section" class="section">
<div class="about-section">
<h1>Era Ernesta Mangnalla: Pierwsze złote lata United (1902-1911)</h1>
<p>Inwestycja Daviesa tchnęła w klub nowe życie. Kluczowym ruchem było zatrudnienie w 1903 roku <a href="https://pl.wikipedia.org/wiki/Ernest_Mangnall" target="_blank>Ernesta Mangnalla</a>, który wprowadził do zespołu profesjonalizm. Pod jego wodzą United w 1906 roku wrócili do elity, a Mangnall sprytnie wykorzystał kryzys w <a href="https://pl.wikipedia.org/wiki/Manchester_City_F.C." target="_blank">Manchesterze City</a>, by przejąć ich największe gwiazdy, z legendarnym <a href="https://pl.wikipedia.org/wiki/Billy_Meredith" target="_blank">Billym Meredithem</a> na czele.
Efekty przyszły błyskawicznie. W 1908 roku, zaledwie sześć lat po widmie bankructwa, klub zdobył swoje <a href="https://en.wikipedia.org/wiki/1907–08_Football_League" target="_blank>pierwsze mistrzostwo Anglii</a>, a rok później dołożył do tego pierwszy w historii <a href="https://en.wikipedia.org/wiki/1908–09_FA_Cup" target="_blank">Puchar Anglii</a>. United stali się najpotężniejszą siłą w kraju, co Davies postanowił przypieczętować budową nowoczesnego domu.
W 1910 roku otwarto <a href="https://pl.wikipedia.org/wiki/Old_Trafford" target="_blank">Old Trafford</a> – stadion, który rozmachem przyćmił konkurencję. Nowa arena szybko stała się świadkiem kolejnego triumfu: w 1911 roku klub świętował tam swoje <a href="https://pl.wikipedia.org/wiki/Piłka_nożna_w_Anglii_(1910/1911)" target="_blank>drugie mistrzostwo</a>. W ciągu zaledwie dekady Manchester United przeszedł niewiarygodną drogę – od komornika na stadionie po absolutną dominację w angielskim futbolu.
</p><div style="height:20px;"></div>
<div class="about-img-container">
<div class="about-img-wrapper">
    <img src="https://i.imgur.com/CltpkTZ.jpeg" alt="Messi">
</div>
</div>
<footer>Skład United po zwycięstwie ligowym. ok. 1911</footer>
</div>
</div>
</div>

</body>

  `;
 
  document.body.appendChild(container);
 
  // ===============================
  // OPTIONAL: CHANGE TITLE & FAVICON
  // ===============================
document.title = "Manchester United • Since 1878";
 
const tabs = document.querySelectorAll('input[name="tab"]');
const tabHover = document.getElementById('tab-hover');
 
const tabLabels = {
    'tab-home-label': ' Home Menu',
    'tab-anti-label': ' Anti-City',
    'tab-quotes-label': ' Quotes',
    'tab-about-label': ' History',
};
 
// show tab hover label on hover
Object.keys(tabLabels).forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('mouseenter', () => {
        const rect = el.getBoundingClientRect();
        tabHover.style.top = (rect.top + rect.height / 2 - tabHover.offsetHeight / 2) + 'px';
        tabHover.innerText = tabLabels[id];
        tabHover.style.opacity = 1;
    });
    el.addEventListener('mouseleave', () => {
        tabHover.style.opacity = 0;
    });
});
 
// scroll fix
tabs.forEach(tab => {
    tab.addEventListener('change', () => {
        // fix /fpix for me
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
 
        // fix for others
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
 
 
// custom favicon - 48x48 png + fallback
(function() {
    var head = document.head || document.getElementsByTagName('head')[0];
 
    // remove all old favicons
    var oldLinks = head.querySelectorAll('link[rel*="icon"], link[rel*="Icon"]');
    oldLinks.forEach(function(el) { el.remove(); });
 
    // main: 48x48 png
    var link48 = document.createElement('link');
    link48.rel = 'icon';
    link48.type = 'image/png';
    link48.sizes = '48x48';                  //
    link48.href = 'https://i.imgur.com/7iGND0y.png';  //
    head.appendChild(link48);
 
    // fallback for old/default (no sizes - browser picks)
    var linkDefault = document.createElement('link');
    linkDefault.rel = 'icon';
    linkDefault.type = 'image/png';
    linkDefault.href = link48.href;  //
    head.appendChild(linkDefault);
 
    // extra shortcut icon (for IE/legacy)
    var linkShortcut = document.createElement('link');
    linkShortcut.rel = 'shortcut icon';
    linkShortcut.type = 'image/png';
    linkShortcut.href = link48.href;
    head.appendChild(linkShortcut);
})();
});











