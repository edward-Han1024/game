/*
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
