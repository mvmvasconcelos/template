var game;
	/*	Cria as variáveis que armazenarão a largura e altura da tela, 
		e o centro X e Y dela, passadas no preload() */
	var largura, altura, centroX, centroY;
window.onload = function() {
	//Configurações a serem usadas
	var config = {
		type: Phaser.AUTO,
		parent: 'Template',
		width: 500,
		height: 600,
		background: '#ffffff',
		scene: [telaLoading, telaTitulo] 
	};


	//Cria um novo objeto Phaser Game
	game = new Phaser.Game(config);

}//window.onload

class telaLoading extends Phaser.Scene {
	constructor(){
        super("telaLoading");
    }

	preload() {
		//Carrega a imagem
		this.load.image('logo', 'assets/sprites/logo.png');
		
		//Looping apenas para demorar mais pra carregar e testar o código
	    for (var i = 0; i < 20; i++) {
	        this.load.image('logo' + i, 'assets/sprites/logo.png');
	    }

	    //Largura e altura da tela
	    largura = this.cameras.main.width;
	    altura = this.cameras.main.height;
	    console.log(altura);

	    //Centros
	    centroX = largura / 2;
	    centroY = altura / 2;

	    /*	Cria os GameObject.Graphics que serão usados na barra de loading
	    	que será atualizado dentro do 'progress'. A caixaLoading é o
	    	retângulo que será a borda da barraLoading. E a barraLoading
	    	será atualizada conforme percentual de progresso dos assets sendo
	    	carregados. */
	    var barraLoading = this.add.graphics();
	    var caixaLoading = this.add.graphics();
	    caixaLoading.fillStyle(0x222222, 0.8);
	    caixaLoading.fillRect(centroX / 2, centroY, centroX, 25);
	    
	    //Texto do loading
	    var textoLoading = this.make.text({
	    	x: centroX,
	    	y: centroY - 50,
	    	text: 'Carregando...',
	    	style: {
	    		font: '15px Monospace',
	    		fill: '#ffffff'
	    	}
	    });
	    textoLoading.setOrigin(0.5, 0.5);

	    //Texto progresso
	    var textoProgresso = this.make.text({
	   		x: centroX,
	   		y: centroY + 14,
	   		text: '0%',
	   		style: {
	   			font: '14px Monospace',
	   			fill: '#ffffff'
	   		}
	   });
	   textoProgresso.setOrigin(0.5, 0.5);

	   //Texto do arquivo carregado
	    var textoArquivo = this.make.text({
	    	x: centroX,
	    	y: centroY + 50,
	    	text: '',
	    	style: {
	    		font: '15px Monospace',
	    		fill: '#ffffff'
	    	}
	    });
	    textoArquivo.setOrigin(0.5, 0.5);

	    /*	Listener que checa pelo evento 'progress' que é emitido pelo
			LoaderPlugin do Phaser. Ele ocorre a cada vez que um arquivo é
			carregado. Quando o evento 'progress' é emitido, ele retorna 
			um valor entre 0 e 1, que pode ser usado para acompanhar o
			progresso geral do processo de loading */
	    this.load.on('progress', function(value) {

	    	/*	A barraLoading crescerá aumentando a largura (width)
	    		conforme o 'value' do 'progress' é recebido. */
	    	barraLoading.clear();
	    	barraLoading.fillStyle(0xffffff, 1);
	    	barraLoading.fillRect(centroX / 2 + 5, centroY + 4, (centroX - 15) * value, 17);

	    	//O value é multiplicado por 100 porque o valor dele é entre 0 e 1
	    	textoProgresso.setText(parseInt(value * 100) + '%');
	    });
	    /*	Listener que checa pelo evento 'progress' que é emitido pelo
			LoaderPlugin do Phaser. Ele ocorre a cada vez que um arquivo é
			carregado. Quando o evento 'fileprogress' é emitido, ele retorna
			um objeto contendo informações sobre o arquivo que recém foi
			carregado. */
	    this.load.on('fileprogress', function(file) {
	    	//Atualiza o texto com o arquivo sendo carregado no momento
	    	textoArquivo.setText('Carregando arquivo: ' + file.key);
	    	//console.log("fileprogress " + file.src);
	    });
	     /*	Listener que checa pelo evento 'complete' que é emitido pelo
			LoaderPlugin do Phaser. Ele ocorre apenas uma vez, somente quando
			todos os arquivos foram carregados.	*/
	    this.load.on('complete', function() {
	    	console.log('Completou');

	    	//	Ao completar o loading, destrói os objetos
	    	barraLoading.destroy();
	    	caixaLoading.destroy();
	    	textoLoading.destroy();
	    	textoProgresso.destroy();
	    	textoArquivo.destroy();
	    });
	}//preload
	create() {
		//Adiciona o logo centralizado
		var logo = this.add.image(centroX, centroY, 'logo');
		logo.setOrigin(0.5, 0.5);
		console.log("FOI");

		//Timer para carregar a tela título após exibir o logo por alguns segundos
		this.time.addEvent({delay: 2000, callback: this.tela, callbackScope: this, loop: false});


	}//create
	tela(){
		this.scene.start("telaTitulo")
	}

}//class telaLoading

class telaTitulo extends Phaser.Scene {
	constructor(){
        super("telaTitulo");
    }
    preload(){
    	var textoTitulo = this.make.text({
	    	x: centroX,
	    	y: centroY,
	    	text: 'Bem vindo à \nTELA TÍTULO',
	    	style: {
	    		font: '16px Monospace',
	    		fill: '#ffffff'
	    	}
	    });
	    textoTitulo.setOrigin(0.5, 0.5);
    }
}//class telaTitulo