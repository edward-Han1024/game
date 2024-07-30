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
document.loadMap = (plane) => {
	let a = 0
	let b = 0
	if (plane == 0){a = 0;b = 0;}
	else if(plane == 1){a = 1;b = 0;}
	else if(plane == 2){a = 0;b = 1;}
	else{a = 1;b = 1;}
	for (let i = 1; i <= 16; i++){
		for (let j = 1; j <= 16; j++){
			if (document.Game.Visibility[a][b][j-1][i-1]){
				let element = document.getTableElement(i,j)
				let value = document.Game.Map[a][b][j-1][i-1]
				element.html(value);
				element.css({
					"background-color": document.Game.Values[value].Color,
					"color": document.Game.Values[value].TextColor
				})
			}
		}
	}
}
// v  v  v  v  v // v LOADED DATA v // ████████████████████████████████████████████████████████████████████████████████████
document.Game = JSON.parse(JSON.stringify(Data));
document.loadMap(0);
