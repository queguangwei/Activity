import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

class demo extends Component {
	constructor (props) {
		super(props)
		this.initCanvas = this.initCanvas.bind(this)
		this.state = {
			canvaswidth: 680,// 画布宽度
			canvasheight: 520,// 画布高度
			x0: 500,
			y0: 400,
			r: 72,
			lineWidth: 16,
			strokeStyle: 'rgba(248, 248, 248, 1)',
			LinearGradientColor1: '#3EECED',
			LinearGradientColor2: '#499BE6'
		}
	}

	roundedRect(ctx,x,y,width,height,radius) {
		ctx.beginPath();
		ctx.moveTo(x,y+radius);
		ctx.lineTo(x,y+height-radius);
		ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
		ctx.lineTo(x+width-radius,y+height);
		ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
		ctx.lineTo(x+width,y+radius);
		ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
		ctx.lineTo(x+radius,y);
		ctx.quadraticCurveTo(x,y,x,y+radius);
		ctx.stroke();
	}

	initCanvas() {
		const {
			x0,//原点坐标
			y0,
			r,// 半径
			lineWidth, // 画笔宽度
			strokeStyle, //画笔颜色
			LinearGradientColor1, //起始渐变颜色
			LinearGradientColor2, //结束渐变颜色
			Percentage,// 进度百分比
		} = this.state
		let canvas = document.getElementById("canvas")
		if (canvas.getContext) {
			let ctx = canvas.getContext("2d");
			// let lineJoin = ['round', 'bevel', 'miter'];
			// ctx.lineWidth = 10;
			// for (var i = 0; i < lineJoin.length; i++) {
			// 	ctx.lineJoin = lineJoin[i];
			// 	ctx.beginPath();
			// 	ctx.moveTo(-5, 5 + i * 40);
			// 	ctx.lineTo(35, 45 + i * 40);
			// 	ctx.lineTo(75, 5 + i * 40);
			// 	ctx.lineTo(115, 45 + i * 40);
			// 	ctx.lineTo(155, 5 + i * 40);
			// 	ctx.stroke();
			// }

			// let lineCap = ['butt','round','square'];
			// ctx.strokeStyle = '#09f';
			// ctx.beginPath();
			// ctx.moveTo(10,10);
			// ctx.lineTo(140,10);
			// ctx.moveTo(10,140);
			// ctx.lineTo(140,140);
			// ctx.stroke();
			// ctx.strokeStyle = 'black';
			// for (var i=0;i<lineCap.length;i++){
			// 	ctx.lineWidth = 15;
			// 	ctx.lineCap = lineCap[i];
			// 	ctx.beginPath();
			// 	ctx.moveTo(25+i*50,10);
			// 	ctx.lineTo(25+i*50,140);
			// 	ctx.stroke();
			// }

			// ctx.fillStyle = '#FD0';
			// ctx.fillRect(0,0,75,75);
			// ctx.fillStyle = '#6C0';
			// ctx.fillRect(75,0,75,75);
			// ctx.fillStyle = '#09F';
			// ctx.fillRect(0,75,75,75);
			// ctx.fillStyle = '#F30';
			// ctx.fillRect(75,75,75,75);
			// ctx.fillStyle = '#FFF';
			// ctx.globalAlpha = 0.2;
			// for (var i=0;i<7;i++){
			// 	ctx.beginPath();
			// 	ctx.arc(75,75,10+10*i,0,Math.PI*2,true);
			// 	ctx.fill();
			// }

			ctx.fillStyle = 'rgb(255,221,0)';
			ctx.fillRect(200,0,150,37.5);
			ctx.fillStyle = 'rgb(102,204,0)';
			ctx.fillRect(200,37.5,150,37.5);
			ctx.fillStyle = 'rgb(0,153,255)';
			ctx.fillRect(200,75,150,37.5);
			ctx.fillStyle = 'rgb(255,51,0)';
			ctx.fillRect(200,112.5,150,37.5);
			for (var i=0;i<10;i++){
				ctx.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
				for (var j=0;j<4;j++){
					ctx.fillRect(5+i*14,5+j*37.5,14,27.5)
				}
			}

			for (var i = 0; i < 10; i++){
				ctx.lineWidth = 1+i;
				ctx.beginPath();
				ctx.moveTo(5+i*14,5);
				ctx.lineTo(5+i*14,140);
				ctx.stroke();
			}

			// this.roundedRect(ctx,12,12,150,150,15);
			// this.roundedRect(ctx,19,19,150,150,9);
			// this.roundedRect(ctx,53,53,49,33,10);
			// this.roundedRect(ctx,53,119,49,16,6);
			// this.roundedRect(ctx,135,53,49,33,10);
			// this.roundedRect(ctx,135,119,25,49,10);
			// for(var i=0;i<8;i++){
			// 	ctx.fillRect(51+i*16,35,4,4);
			// }
			// for(i=0;i<6;i++){
			// 	ctx.fillRect(115,51+i*16,4,4);
			// }
			// for(i=0;i<8;i++){
			// 	ctx.fillRect(51+i*16,99,4,4);
			// }
			//
			// ctx.beginPath();
			// ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
			// ctx.lineTo(31,37);
			// ctx.fill();
			//
			// ctx.beginPath();
			// ctx.moveTo(83,116);
			// ctx.lineTo(83,102);
			// ctx.bezierCurveTo(83,94,89,88,97,88);
			// ctx.bezierCurveTo(105,88,111,94,111,102);
			// ctx.lineTo(111,116);
			// ctx.lineTo(106.333,111.333);
			// ctx.lineTo(101.666,116);
			// ctx.lineTo(97,111.333);
			// ctx.lineTo(92.333,116);
			// ctx.lineTo(87.666,111.333);
			// ctx.lineTo(83,116);
			// ctx.fill();
			// ctx.fillStyle = "white";
			// ctx.beginPath();
			// ctx.moveTo(91,96);
			// ctx.bezierCurveTo(88,96,87,99,87,101);
			// ctx.bezierCurveTo(87,103,88,106,91,106);
			// ctx.bezierCurveTo(94,106,95,103,95,101);
			// ctx.bezierCurveTo(95,99,94,96,91,96);
			// ctx.moveTo(103,96);
			// ctx.bezierCurveTo(100,96,99,99,99,101);
			// ctx.bezierCurveTo(99,103,100,106,103,106);
			// ctx.bezierCurveTo(106,106,107,103,107,101);
			// ctx.bezierCurveTo(107,99,106,96,103,96);
			// ctx.fill();
			// ctx.fillStyle = "black";
			// ctx.beginPath();
			// ctx.arc(101,102,2,0,Math.PI*2,true);
			// ctx.fill();
			// ctx.beginPath();
			// ctx.arc(89,102,2,0,Math.PI*2,true);
			// ctx.fill();

			// ctx.fillStyle = "rgb(200,0,0)";
			// ctx.fillRect (10, 10, 55, 50);
			// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
			// ctx.fillRect (30, 30, 55, 50);

			// ctx.fillStyle = "rgb(245, 5, 5)"
			// ctx.beginPath();
			// ctx.moveTo(75,40);
			// ctx.bezierCurveTo(75,37,70,25,50,25);
			// ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
			// ctx.bezierCurveTo(20,80,40,102,75,120);
			// ctx.bezierCurveTo(110,102,130,80,130,62.5);
			// ctx.bezierCurveTo(130,62.5,130,25,100,25);
			// ctx.bezierCurveTo(85,25,75,37,75,40);
			// ctx.fill();

			// ctx.beginPath();
			// ctx.moveTo(25,25);
			// ctx.lineTo(105,25);
			// ctx.lineTo(25,105);
			// ctx.fill();
			//
			// ctx.beginPath();
			// ctx.moveTo(125,125);
			// ctx.lineTo(125,45);
			// ctx.lineTo(45,125);
			// ctx.closePath();
			// ctx.stroke();

			// ctx.beginPath();
			// ctx.moveTo(75,25);
			// ctx.quadraticCurveTo(25,25,25,62.5);
			// ctx.quadraticCurveTo(25,100,50,100);
			// ctx.quadraticCurveTo(50,120,30,125);
			// ctx.quadraticCurveTo(60,120,65,100);
			// ctx.quadraticCurveTo(125,100,125,62.5);
			// ctx.quadraticCurveTo(125,25,75,25);
			// ctx.stroke();

			// ctx.beginPath();
			// ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
			// ctx.moveTo(110,75);
			// ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
			// ctx.moveTo(65,65);
			// ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
			// ctx.moveTo(95,65);
			// ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
			// ctx.stroke();

			//创建背景圆
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeStyle;
			ctx.lineCap = 'round';
			ctx.beginPath();//开始一个新的路径
			ctx.arc(x0, y0, r, 0, 2 * Math.PI, false);///用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
			ctx.stroke();//对当前路径进行描边
			//创建渐变圆环
			// let g = circle.createLinearGradient(x0, 0, x0 + r * Math.cos(Percentage * (Math.PI * 2)), y0 + r * Math.sin(this.props.Percentage * (Math.PI * 2)));  //创建渐变对象  渐变开始点和渐变结束点
			// g.addColorStop(0, LinearGradientColor1); //添加颜色点
			// g.addColorStop(1, LinearGradientColor2);
			// circle.lineWidth = lineWidth //设置线条宽度
			// circle.lineCap = 'round';
			// circle.strokeStyle = g;
			// circle.beginPath();//开始一个新的路径
			// circle.arc(x0, y0, r, -Math.PI / 2, -Math.PI / 2 - Percentage * (Math.PI * 2), true);
			// circle.stroke();//对当前路径进行描边
		}
	}

	componentDidMount() {
		this.initCanvas()
	}
	componentDidUpdate() {
		this.initCanvas()
	}

	render() {
		const { width, height, canvaswidth, canvasheight } = this.state
		return (
			<DocumentTitle title="demo">
				<div style={{ width: width, height: height, padding: 10 }}>
					<canvas id="canvas" width={canvaswidth} height={canvasheight}></canvas>
				</div>
			</DocumentTitle>
		)
	}
}
export default demo
module.exports = exports['default']
