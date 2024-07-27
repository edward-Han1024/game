/*
This is a simple Html page
    Copyright (C) 2024 Edward Han

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
function kill(what){
	if (what=="page"){
		$("html").html("");
	}
	if (what=="comp"){
		$("body").html("<span style=\"font-family: monospace\">A fatal error has occured. <br>Press any key to continue...</span>")
	}
}
const runstart = function(){
	console.log("==!You have entered the javascript console!==");
	console.log("============!Beware of its story!============");
	console.log("--test--jQuery--");
	console.log($("#top"));
}
$(document).ready(function(){
	$("#hidebody").click(function(event) {
		event.preventDefault();
		$("body").hide("slow", function(){
			console.log("run `$(\"body\").show();`");
		});
	});
	$("#kill").click(function(event) {
		event.preventDefault();
		$("body").html("<p>wait, you destroyed the page</p>");
	})
})
setTimeout(runstart, 1000);
