/*
Copyright 2024 Edward Han

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/
import Data from "./new.json" with {type: "json"};
document.Game = {};
document.main = $("#main");
document.table = $("#table");
console.log(document.Game)
document.getTableElement = (x,y) => {
	let res = $(`#table tr:nth-child(${y}) td:nth-child(${x}`);
	return res
}
// v  v  v  v  v // v LOADED DATA v // ████████████████████████████████████████████████████████████████████████████████████
document.Game = JSON.parse(JSON.stringify(Data));
document.Game.Turn = (turns) => {
	document.Game.Nturn += turns;
	document.Game.Update();
}
document.Game.LoadMap = (plane) => {
	let a = 0
	let b = 0
	if (plane == 0){a = 0;b = 0;}
	else if(plane == 1){a = 1;b = 0;}
	else if(plane == 2){a = 0;b = 1;}
	else{a = 1;b = 1;}
	for (let i = 1; i <= 16; i++){
		for (let j = 1; j <= 16; j++){
			if (document.Game.Visibility[a][b][j-1][i-1]){
				let element = document.getTableElement(i,j);
				let value = document.Game.Map[a][b][j-1][i-1];
				element.html(document.Game.Values[value].Name);
				element.css({
					"background-color": document.Game.Values[value].Color,
					"color": document.Game.Values[value].TextColor
				});
			}
		}
	}
}
// Plane Actions
document.Game.GetPlane = (x = 0, y = 0) => {
	if (!x){
		let x = document.Game.Position[0]
	}
	if (!y){
		let y = document.Game.Position[1]
	}
	if (x<=16 && y<=16){return 0}
	if (x>16 && y<=16){return 1}
	if (x<=16 && y>16){return 2}
	if (x>16 && y>16){return 3}
}
document.Game.ReducePlane = (plane) => { // Returns (x, y)
	if (plane==0){return [0,0]}
	if (plane==1){return [1,0]}
	if (plane==2){return [0,1]}
	if (plane==3){return [1,1]}
}
document.Game.VisibleLoad = () => {
	let pos = document.Game.Position;
	let Map = document.Game.Map;
	let Values = document.Game.Values
	function plane(pos){
		return document.Game.ReducePlane(document.Game.GetPlane(pos[0],pos[1]))
	}
	// pos[0]+1, pos[1]:
	let newpos = [pos[0]+1, pos[1]]
	let planet = plane(newpos)
	let Value = Map[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16]
	if (Values[Value].Visibility >= document.Game.VPower){
		document.Game.Visibility[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16] = true
	}
	// pos[0], pos[1]+1:
	newpos = [pos[0], pos[1]+1]
	planet = plane(newpos)
	Value = Map[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16]
	if (Values[Value].Visibility >= document.Game.VPower){
		document.Game.Visibility[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16] = true
	}
	// pos[0]-1, pos[1]:
	newpos = [pos[0]-1, pos[1]]
	planet = plane(newpos)
	Value = Map[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16]
	if (Values[Value].Visibility >= document.Game.VPower){
		document.Game.Visibility[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16] = true
	}
	// pos[0], pos[1]-1:
	newpos = [pos[0], pos[1]-1]
	planet = plane(newpos)
	Value = Map[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16]
	if (Values[Value].Visibility >= document.Game.VPower){
		document.Game.Visibility[planet[1]][planet[0]][(newpos[1] - 1) % 16][(newpos[0] - 1) % 16] = true
	}
}
document.Game.Update = (plane = document.Game.GetPlane()) => {
	document.Game.VisibleLoad()
	document.Game.LoadMap(plane);
	$("#turn").html(document.Game.Nturn);
}
document.Game.Move = (dir) => {
	let pos = (0,0);
	if (dir == 0){
		pos = [document.Game.Position[0] + 1, document.Game.Position[1]];
	}
	if (dir == 1){
		pos = [document.Game.Position[0], document.Game.Position[1] - 1];
	}
	if (dir == 2){
		pos = [document.Game.Position[0] - 1, document.Game.Position[1]];
	}
	if (dir == 3){
		pos = [document.Game.Position[0], document.Game.Position[1] + 1];
	}
	if (1<=pos[0]<=32 && 1<=pos[1]<=32){
		let plane = document.Game.ReducePlane(document.Game.GetPlane(pos[0],pos[1]));
		let value = document.Game.Map[plane[1]][plane[0]][(pos[1]-1) % 16][(pos[0]-1) % 16]
		if (document.Game.Values[value].Travel <= document.Game.TPower){
			document.Game.Turn(document.Game.Values[value].Travel);
			document.Game.Position = pos;
		}
	}
}
document.Game.Update()
