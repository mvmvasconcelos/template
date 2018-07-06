window.onload = function() {
	//Configurações a serem usadas
	var config = {
		type: Phaser.AUTO,
		parent: 'Template',
		width: 500,
		height: 600,
		scene: {
			preload: preload,
			create: create
		}
	};

	//Cria um novo objeto Phaser Game
	var game = new Phaser.Game(config);

	function preload() {
		//Carrega a imagem
		this.load.image('logo', 'assets/sprites/logo.png');
		
		//Looping apenas para demorar mais pra carregar e testar o código
	    for (var i = 0; i < 100; i++) {
	        this.load.image('logo'+i, 'assets/sprites/logo.png');
	    }

	    /*	Cria os GameObject.Graphics que serão usados na barra de loading
	    	que será atualizado dentro do 'progress'. A caixaLoading é o
	    	retângulo que será a borda da barraLoading. E a barraLoading
	    	será atualizada conforme percentual de progresso dos assets sendo
	    	carregados. */
	    var barraLoading = this.add.graphics();
	    var caixaLoading = this.add.graphics();
	    caixaLoading.fillStyle(0x222222, 0.8);
	    caixaLoading.fillRect(50, 300, 250, 25);
	   // console.log("center " + game.getBounds().width);

	    /*	Listener que checa pelo evento 'progress' que é emitido pelo
			LoaderPlugin do Phaser. Ele ocorre a cada vez que um arquivo é
			carregado. Quando o evento 'progress' é emitido, ele retorna 
			um valor entre 0 e 1, que pode ser usado para acompanhar o
			progresso geral do processo de loading */
	    this.load.on('progress', function(value) {
	    	console.log("progress " + value);

	    	/*	A barraLoading crescerá aumentando a largura (width)
	    		conforme o 'value' do 'progress' é recebido. */
	    	barraLoading.clear();
	    	barraLoading.fillStyle(0xffffff, 1);
	    	barraLoading.fillRect(55, 305, 230 * value, 17);
	    });
	    /*	Listener que checa pelo evento 'progress' que é emitido pelo
			LoaderPlugin do Phaser. Ele ocorre a cada vez que um arquivo é
			carregado. Quando o evento 'fileprogress' é emitido, ele retorna
			um objeto contendo informações sobre o arquivo que recém foi
			carregado. */
	    this.load.on('fileprogress', function(file) {
	    	console.log("fileprogress " + file.src);
	    });
	     /*	Listener que checa pelo evento 'complete' que é emitido pelo
			LoaderPlugin do Phaser. Ele ocorre apenas uma vez, somente quando
			todos os arquivos foram carregados.	*/
	    this.load.on('complete', function() {
	    	console.log('Completou');

	    	//	Ao completar o loading, destrói ambos os objetos
	    	barraLoading.destroy();
	    	caixaLoading.destroy();
	    });
	}
	function create() {
		//Adiciona o logo na tela
		var logo = this.add.image(200, 200, 'logo');
		console.log("FOI");

	}

}