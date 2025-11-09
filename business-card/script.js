/* PNG export using html-to-image. Ensures crisp output sized for printing. */
(function(){
  const btn = document.getElementById('downloadBtn');
  const node = document.getElementById('card');
  if(!btn || !node) return;

  function download(dataUrl, filename){
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  btn.addEventListener('click', async () => {
    btn.disabled = true; btn.textContent = 'Rendering…';
    try{
      // Wait for fonts and images (logo) to finish loading
      await document.fonts?.ready;
      const pixelRatio = 2; // 2× oversampling for extra crisp PNG
      const dataUrl = await window.htmlToImage.toPng(node, {
        pixelRatio,
        backgroundColor: '#0b0f13',
        cacheBust: true
      });
      download(dataUrl, 'nexus-business-card-1050x600@2x.png');
    }catch(err){
      console.error(err);
      alert('Export failed. See console for details.');
    }finally{
      btn.disabled = false; btn.textContent = 'Download PNG';
    }
  });
})();
