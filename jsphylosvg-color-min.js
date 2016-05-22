Smits={},Smits.Common={nodeIdIncrement:0,activeNode:0,roundFloat:function(e,t){for(var n=0,r=1;t>n;)r*=10,n++;return Math.round(e*r)/r},apply:function(e,t){if(e&&"object"==typeof t)for(var n in t)e[n]=t[n];return e},addRaphEventHandler:function(e,t,n,r){try{e[t](function(e,t){return function(n,r){var a=t;a.e=n,e(a)}}(n,r))}catch(a){}},isInteger:function(e){return!isNaN(parseInt(e))},isXMLSerializerAvailable:function(){return"function"==typeof XMLSerializer?!0:!1},createSvgEl:function(e,t){if(e=document.createElementNS("http://www.w3.org/2000/svg",e),t)for(var n in t)t.hasOwnProperty(n)&&e.setAttribute(n,String(t[n]));return e},createGradientEl:function(e,t,n){if("radialGradient"!=t.type)return!1;var r=Smits.Common.createSvgEl("radialGradient",{id:e,gradientUnits:"userSpaceOnUse",cx:n[0],cy:n[1],r:n[2],fx:n[0],fy:n[1]});if(t.stop)for(var a=t.stop,i=0;i<a.length;i++){var s=a[i];s["@attributes"]?r.appendChild(Smits.Common.createSvgEl("stop",s["@attributes"])):(s._attributes&&delete s._attributes,s._children&&delete s._children,s.__proto__&&delete s.__proto__,r.appendChild(Smits.Common.createSvgEl("stop",s)))}return r},setCssStyle:function(e,t){var n=document.styleSheets[0];n.addRule?n.addRule(e,t):n.insertRule&&n.insertRule(e+" { "+t+" }",n.cssRules.length)}},Smits.PhyloCanvas=function(){var e,t,n,r,a;return function(i,s,l,o,h){if(this.getNewickObject=function(){return n},this.clear=function(){},this.scale=function(e){r.svg.scale(e)},this.getSvg=function(){return r},this.getPhylogram=function(){return e},this.getSvgSource=function(){if(Raphael.svg&&Smits.Common.isXMLSerializerAvailable()){var e=new XMLSerializer;return e.serializeToString(r.svg.canvas)}return!1},"object"==typeof i)if(i.xml){if(i.fileSource)var u=i.xml;else var u=XMLObjectifier.textToXML(i.xml);u=XMLObjectifier.xmlToJSON(u),a=new Smits.PhyloCanvas.PhyloxmlParse(u)}else if(i.phyloxml){if(i.fileSource)var u=i.phyloxml;else var u=XMLObjectifier.textToXML(i.phyloxml);u=XMLObjectifier.xmlToJSON(u),a=new Smits.PhyloCanvas.PhyloxmlParse(u)}else if(i.nexml){if(i.fileSource)var u=i.nexml;else var u=XMLObjectifier.textToXML(i.nexml);u=XMLObjectifier.xmlToJSON(u),a=new Smits.PhyloCanvas.NexmlParse(u,i)}else i.json?a=new Smits.PhyloCanvas.PhyloxmlParse(i.json):i.newick?a=new Smits.PhyloCanvas.NewickParse(i.newick):i.nexmlJson?a=new Smits.PhyloCanvas.NexmlJsonParse(i):alert("Please set the format of input data");else a=new Smits.PhyloCanvas.NewickParse(i);t=s,r=new Smits.PhyloCanvas.Render.SVG(t,l,o),e="circular"==h?new Smits.PhyloCanvas.Render.CircularPhylogram(r,a):new Smits.PhyloCanvas.Render.Phylogram(r,a)}}(),Smits.PhyloCanvas.prototype={},Smits.PhyloCanvas.Node=function(){return function(e,t){this.id=Smits.Common.nodeIdIncrement+=1,this.level=0,this.len=0,this.newickLen=0,this.name="",this.type="",this.chart={},this.img=[],e&&Smits.Common.apply(this,e),this._countAllChildren=!1,this._countImmediateChildren=!1,this._midBranchPosition=!1,this.children=new Array,t&&t.children.push(this)}}(),Smits.PhyloCanvas.Node.prototype={getCountAllChildren:function(){if(this._countAllChildren!==!1)return this._countAllChildren;var e=0;for(var t in this.children)if(Smits.Common.isInteger(t)){var n=this.children[t];n.children&&n.children.length>0?e+=n.getCountAllChildren():e++}return this._countAllChildren=e,e},getCountImmediateChildren:function(){if(this._countImmediateChildren!==!1)return this._countImmediateChildren;var e=0;for(var t in this.children){var n=this.children[t];e+=n.length}return this._countImmediateChildren=e,e},getMidbranchPosition:function(e){if(this._midBranchPosition!==!1)return this._midBranchPosition;for(var t=[0,0],n=0;n<this.children.length;n++){var r=this.children[n];r.children&&r.children.length>0?0==n&&e?(t[0]=r.getMidbranchPosition(!0),t[1]+=r.getCountAllChildren()-1):0==n?(t[0]=r.getMidbranchPosition(),t[1]+=r.getCountAllChildren()):n==this.children.length-1?t[1]+=r.getMidbranchPosition():t[1]+=r.getCountAllChildren():0==n&&e?t[0]=0:0==n?(t[0]=1,t[1]+=1):n==this.children.length-1?t[1]+=1:t[1]+=1}return this._midBranchPosition=t[1]>=t[0]?(t[1]+t[0])/2:t[0],this._midBranchPosition}},Smits.PhyloCanvas.NewickParse=function(){var e,t,n,r,a,i=0,s=0,l=function(e){for(var n=new Smits.PhyloCanvas.Node;")"!==t&&","!==t;)":"===t?(c(),n.len=Smits.Common.roundFloat(h(),4),0==n.len&&(n.len=1e-4)):"'"===t||'"'===t?(n.type="label",n.name=u(t)):(n.type="label",n.name=h());return n.level=e.level+1,n},o=function(e){var n=new Smits.PhyloCanvas.Node;for(e&&(n.level=e.level+1);")"!==t;)c(),"("===t?n.children.push(o(n)):n.children.push(l(n));return c(),":"!==t&&")"!==t&&","!==t&&";"!==t&&(n.type="label",n.name=h()),":"===t&&(c(),n.len=Smits.Common.roundFloat(h(),4),0==n.len&&(n.len=1e-4),n.type="stem"),n},h=function(){for(var e="";":"!==t&&")"!==t&&","!==t&&";"!==t;)e+=t,c();return e},u=function(e){for(var n="";t!==e;)n+=t,c();return n},c=function(){return t=e.charAt(n),n+=1,t},d=function(e,t){if(e.children&&e.children.length)for(var n=0;n<e.children.length;n++){var r=e.children[n];0===r.len&&(r.len=1),r.newickLen=Smits.Common.roundFloat(r.len+e.newickLen,4),r.level>i&&(i=r.level),r.newickLen>s&&(s=r.newickLen),r.children.length>0&&d(r,e)}return e};return function(t){this.getRoot=function(){return r},this.getLevels=function(){return i},this.getNewickLen=function(){return s},this.getValidate=function(){return a},i=0,s=0,e=t,n=0,c(),r=o(),r=d(r)}}(),Smits.PhyloCanvas.NewickParse.prototype={},Smits.PhyloCanvas.PhyloxmlParse=function(){var e,t,n=0,r=0,a=function(e,n){var r=new Smits.PhyloCanvas.Node;if(n&&(r.level=n.level+1),e.clade&&e.clade.length)for(var i=0;i<e.clade.length;i++){var s=e.clade[i];r.children.push(a(s,r))}if(e.branch_length&&("object"==typeof e.branch_length&&(e.branch_length=e.branch_length[0].Text),r.len=Smits.Common.roundFloat(e.branch_length,4),0==r.len&&(r.len=1e-4)),e.color?(r.red=e.color[0].red[0].Text,r.green=e.color[0].green[0].Text,r.blue=e.color[0].blue[0].Text):(r.red=0,r.green=0,r.blue=0),e.name?(r.type="label",r.name=e.name[0].Text,e.name[0]&&e.name[0].style&&(r.style=e.name[0].style),e.name[0]&&e.name[0].bgStyle&&(r.bgStyle=e.name[0].bgStyle)):e.confidence&&(r.name=e.confidence[0].Text),e.sequence&&e.sequence[0]&&e.sequence[0].name&&e.sequence[0].name[0]&&e.sequence[0].name[0].Text&&(r.sequenceName=e.sequence[0].name[0].Text),e.taxonomy&&e.taxonomy[0]&&(e.taxonomy[0].scientific_name&&e.taxonomy[0].scientific_name[0]&&e.taxonomy[0].scientific_name[0].Text&&(r.taxonomyScientificName=e.taxonomy[0].scientific_name[0].Text),e.taxonomy[0].common_name&&e.taxonomy[0].common_name[0]&&e.taxonomy[0].common_name[0].Text&&(r.taxonomyCommonName=e.taxonomy[0].common_name[0].Text)),e.sequence&&e.sequence[0]&&e.sequence[0].accession&&e.sequence[0].accession[0]&&e.sequence[0].accession[0].Text&&(r.sequenceAccession=e.sequence[0].accession[0].Text),e.point&&(r.LatLong=[e.point[0].lat[0].Text,e.point[0]["long"][0].Text]),r.name||(r.sequenceName?r.name=r.sequenceName:r.taxonomyScientificName?r.name=r.taxonomyScientificName:r.taxonomyCommonName?r.name=r.taxonomyCommonName:r.sequenceAccession&&(r.name=r.sequenceAccession),r.name&&(r.type="label")),e.annotation&&(e.annotation[0]&&e.annotation[0].desc&&e.annotation[0].desc[0]&&e.annotation[0].desc[0].Text&&(r.description=e.annotation[0].desc[0].Text),e.annotation[0]&&e.annotation[0].uri&&e.annotation[0].uri[0]&&e.annotation[0].uri[0].Text&&(r.uri=e.annotation[0].uri[0].Text),e.annotation[0]&&e.annotation[0].img))for(var i in e.annotation[0].img)Smits.Common.isInteger(i)&&(r.img[i]=e.annotation[0].img[i].Text);if(e.chart&&e.chart[0])for(var i in e.chart[0])"Text"!=i&&"_children"!=i&&(r.chart[i]=e.chart[0][i][0].Text);return r&&r.level>1&&(r.len||(t="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees.")),r},i=function(e,t){if(e.children&&e.children.length)for(var a=0;a<e.children.length;a++){var s=e.children[a];s.newickLen=Math.round(1e4*(s.len+e.newickLen))/1e4,s.level>n&&(n=s.level),s.newickLen>r&&(r=s.newickLen),s.children.length>0&&i(s,e)}return e},s=function(e,t){for(var n in e)"_children"!=n&&"Text"!=n&&("rectangular"==n||"circular"==n?s(e[n][0],n):(Smits.PhyloCanvas.Render.Parameters[n]||(Smits.PhyloCanvas.Render.Parameters[n]={}),Smits.PhyloCanvas.Render.Parameters.set(n,e[n][0].Text,t)))};return function(l){if(this.getRoot=function(){return e},this.getLevels=function(){return n},this.getNewickLen=function(){return r},this.getValidate=function(){return t},l.phylogeny&&l.phylogeny[0]&&l.phylogeny[0].clade&&(e=a(l.phylogeny[0].clade[0])),l.phylogeny&&l.phylogeny[0]&&l.phylogeny[0].render&&l.phylogeny[0].render[0]){var o=l.phylogeny[0].render[0];if(o&&o.styles){var h=o.styles[0];for(var u in h)if("_children"!=u&&"Text"!=u)if(h[u][0].type&&"radialGradient"==h[u][0].type&&Raphael.svg)h[u][0].name=u,Smits.PhyloCanvas.Render.Style[u]=h[u][0],Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList||(Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList=[]),Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.push(u);else{Smits.PhyloCanvas.Render.Style[u]||(Smits.PhyloCanvas.Render.Style[u]={});for(var c in h[u][0])"_attributes"!=c&&"_children"!=c&&"type"!=c&&(Smits.PhyloCanvas.Render.Style[u][c.replace("_","-")]=h[u][0][c])}}if(o&&o.parameters&&s(o.parameters[0]),o&&o.charts){var d=o.charts[0];for(var u in d)if("_children"!=u&&"Text"!=u)for(var c in d[u])"binary"==d[u][c].type?(d[u][c].chart=u,Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(d[u][c])):"integratedBinary"==d[u][c].type?(d[u][c].chart=u,Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(d[u][c])):"bar"==d[u][c].type&&(d[u][c].chart=u,1==Smits.PhyloCanvas.Render.Parameters.barCharts.length&&Smits.PhyloCanvas.Render.Parameters.barCharts.shift(),Smits.PhyloCanvas.Render.Parameters.barCharts.push(d[u][c]))}}e=i(e)}}(),Smits.PhyloCanvas.PhyloxmlParse.prototype={},Smits.PhyloCanvas.NexmlParse=function(){var e,t,n,r,a=0,i=0,s=function(e,t,a){var i=new Smits.PhyloCanvas.Node;a&&(i.level=a.level+1);for(var l=0;l<n.length;l++)if(n[l].source==e.id)for(var o=0;o<r.length;o++)n[l].target==r[o].id&&i.children.push(s(r[o],n[l].length,i));return i&&i.level>0&&!i.len&&(i.len=1),t&&(i.len=Smits.Common.roundFloat(t,4),0==i.len&&(i.len=1e-4)),e.label&&(i.type="label",i.name=e.label,e.style&&(i.style=e.style)),i},l=function(e,t){if(e.children&&e.children.length)for(var n=0;n<e.children.length;n++){var r=e.children[n];r.newickLen=Math.round(1e4*(r.len+e.newickLen))/1e4,r.level>a&&(a=r.level),r.newickLen>i&&(i=r.newickLen),r.children.length>0&&l(r,e)}return e};return function(o,h){this.getRoot=function(){return e},this.getLevels=function(){return a},this.getNewickLen=function(){return i},this.getValidate=function(){return t},h.tree&&o.trees[0]&&o.trees[0].tree[h.tree-1]?(n=o.trees[0].tree[h.tree-1].edge,r=o.trees[0].tree[h.tree-1].node):(n=o.trees[0].tree[0].edge,r=o.trees[0].tree[0].node);for(var u=0;u<r.length;u++){var c=0;if(r[u].root&&"true"==r[u].root){e=r[u];break}for(var d=0;d<n.length;d++)n[d].target==r[u].id&&c++;if(0==c){e=r[u];break}}e?(e=s(e),e=l(e)):t="Error. Currently, only rooted NeXML trees are supported."}}(),Smits.PhyloCanvas.NexmlParse.prototype={},Smits.PhyloCanvas.NexmlJsonParse=function(){var e,t,n=0,r=0,a=[],i=[],s=function(e,n,r){var l=new Smits.PhyloCanvas.Node;r&&(l.level=r.level+1);for(var o=0;o<a.length;o++)if(a[o].source==e.id)for(var h=0;h<i.length;h++)a[o].target==i[h].id&&l.children.push(s(i[h],a[o].length,l));return n&&(l.len=Smits.Common.roundFloat(n,4),0==l.len&&(l.len=1e-4)),e.label&&(l.type="label",l.name=e.label,e.accession&&(l.accession=e.accession),e.style&&(l.style=e.style),e.bgStyle&&(l.bgStyle=e.bgStyle)),e.chart&&(l.chart=e.chart),l&&l.level>1&&(l.len||(t="Error. Please include Branch Lengths - we only draw rooted phylogenetic trees.")),l},l=function(e,t){if(e.children&&e.children.length)for(var a=0;a<e.children.length;a++){var i=e.children[a];i.newickLen=Math.round(1e4*(i.len+e.newickLen))/1e4,i.level>n&&(n=i.level),i.newickLen>r&&(r=i.newickLen),i.children.length>0&&l(i,e)}return e},o=function(e,t){for(var n in e)"_children"!=n&&"Text"!=n&&("rectangular"==n||"circular"==n?o(e[n],n):(Smits.PhyloCanvas.Render.Parameters[n]||(Smits.PhyloCanvas.Render.Parameters[n]={}),Smits.PhyloCanvas.Render.Parameters.set(n,e[n],t)))};return function(h){this.getRoot=function(){return e},this.getLevels=function(){return n},this.getNewickLen=function(){return r},this.getValidate=function(){return t};var u=h.nexmlJson.nexml,c=u.render;if(c&&c.styles){var d=c.styles;for(var m in d)if("_children"!=m&&"Text"!=m)if(d[m]["@attributes"].type&&"radialGradient"==d[m]["@attributes"].type&&Raphael.svg)d[m].name=m,d[m].type=d[m]["@attributes"].type,Smits.PhyloCanvas.Render.Style[m]=d[m],Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList||(Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList=[]),Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.push(m);else{Smits.PhyloCanvas.Render.Style[m]||(Smits.PhyloCanvas.Render.Style[m]={});for(var y in d[m]["@attributes"])"_attributes"!=y&&"_children"!=y&&"type"!=y&&(Smits.PhyloCanvas.Render.Style[m][y.replace("_","-")]=d[m]["@attributes"][y])}}if(c&&c.parameters&&o(c.parameters),c&&c.charts){var v=c.charts;for(var m in v)v[m]["@attributes"].chart=m,"binary"==v[m]["@attributes"].type?Smits.PhyloCanvas.Render.Parameters.binaryCharts.push(v[m]["@attributes"]):"integratedBinary"==v[m]["@attributes"].type?Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.push(v[m]["@attributes"]):"bar"==v[m]["@attributes"].type&&Smits.PhyloCanvas.Render.Parameters.barCharts.push(v[m]["@attributes"])}if(h.tree&&u.trees[0]&&u.trees[0].tree[h.tree-1])a=u.trees[0].tree[h.tree-1].edge,i=u.trees[0].tree[h.tree-1].node;else{for(var m=0;m<u.trees.tree.edge.length;m++)a.push(u.trees.tree.edge[m]["@attributes"]);for(var m=0;m<u.trees.tree.node.length;m++){var f=u.trees.tree.node[m]["@attributes"];f.label&&(f.chart=u.trees.tree.node[m].chart),i.push(f)}}for(var m=0;m<i.length;m++)i[m].root&&"true"==i[m].root&&(e=i[m]);e?(e=s(e),e=l(e)):t="Error. Currently, only rooted NeXML trees are supported."}}(),Smits.PhyloCanvas.NexmlParse.prototype={},Smits.PhyloCanvas.Render={},Smits.PhyloCanvas.Render.Style={line:{stroke:"rgb(0,0,0)","stroke-width":1},text:{"font-family":"Verdana","font-size":12,"text-anchor":"start"},path:{stroke:"rgb(0,0,0)","stroke-width":1},connectedDash:{stroke:"rgb(200,200,200)","stroke-dasharray":". "},textSecantBg:{fill:"#EEE",stroke:"#DDD"},highlightedEdgeCircle:{fill:"red"},barChart:{fill:"#003300",stroke:"#DDD"},getStyle:function(e,t){return this[e]?this[e]:this[t]}},Smits.PhyloCanvas.Render.Parameters={jsOverride:0,Rectangular:{bufferX:200,paddingX:10,paddingY:20,bufferInnerLabels:10,bufferOuterLabels:5,minHeightBetweenLeaves:10,alignPadding:0,alignRight:!1,showScaleBar:!1},Circular:{bufferRadius:.33,bufferAngle:20,initStartAngle:160,innerCircleRadius:0,minHeightBetweenLeaves:5,bufferInnerLabels:2,bufferOuterLabels:5},binaryCharts:[],integratedBinaryCharts:[],barCharts:[],binaryChartBufferInner:5,binaryChartBufferSiblings:.01,binaryChartThickness:15,binaryChartDisjointed:!1,barChartBufferInner:3,barChartHeight:50,barChartWidth:.5,mouseRollOver:function(e){if(e.node.edgeCircleHighlight)e.node.edgeCircleHighlight.show();else{var t=e.svg.draw(new Smits.PhyloCanvas.Render.Circle(e.x,e.y,5,{attr:Smits.PhyloCanvas.Render.Style.highlightedEdgeCircle}));e.node.edgeCircleHighlight=t[0]}e.textEl.attr({fill:"red"})},mouseRollOut:function(e){e.node.edgeCircleHighlight.hide(),e.textEl.attr({fill:"#000"})},set:function(e,t,n){this.jsOverride||(n?"circular"==n?this.Circular[e]=parseFloat(t):"rectangular"==n&&(this.Rectangular[e]=parseFloat(t)):this[e]=parseFloat(t))}},Smits.PhyloCanvas.Render.Line=function(){return function(e,t,n,r,a,i,s,l){this.type="line",this.attr=Smits.PhyloCanvas.Render.Style.line,this.attr.stroke=["rgb(",a,",",i,",",s,")"].join(""),console.log(this.attr.stroke),this.x1=e,this.x2=t,this.y1=n,this.y2=r,l&&(Smits.Common.apply(this,l),l.attr&&(this.attr=l.attr))}}(),Smits.PhyloCanvas.Render.Text=function(){return function(e,t,n,r){this.type="text",this.attr=Smits.PhyloCanvas.Render.Style.text,this.x=e,this.y=t,this.text=n,r&&(Smits.Common.apply(this,r),r.attr&&(this.attr=r.attr))}}(),Smits.PhyloCanvas.Render.Path=function(){Smits.PhyloCanvas.Render.Style.path;return function(e,t){this.type="path",this.attr=Smits.PhyloCanvas.Render.Style.path,this.path=e,t&&(Smits.Common.apply(this,t),t.attr&&(this.attr=t.attr))}}(),Smits.PhyloCanvas.Render.Circle=function(){return function(e,t,n,r){this.type="circle",this.x=e,this.y=t,this.radius=n,r&&(Smits.Common.apply(this,r),r.attr&&(this.attr=r.attr))}}(),Smits.PhyloCanvas.Render.SVG=function(){var e;return function(t,n,r){e=t,this.canvasSize=[n,r],this.svg=Raphael(t,this.canvasSize[0],this.canvasSize[1])}}(),Smits.PhyloCanvas.Render.SVG.prototype={render:function(){var e=this.phylogramObject.getDrawInstructs();console.log("render",this.phylogramObject.getDrawInstructs());for(var t=0;t<e.length;t++)if("line"==e[t].type){this.svg.path(["M",e[t].x1,e[t].y1,"L",e[t].x2,e[t].y2]).attr(Smits.PhyloCanvas.Render.Style.line)}else if("path"==e[t].type){this.svg.path(e[t].path).attr(e[t].attr)}else if("circle"==e[t].type){this.svg.circle(e[t].x,e[t].y,e[t].radius).attr({stroke:"red"})}else{var n=this.svg.text(e[t].x,e[t].y,e[t].text).attr(Smits.PhyloCanvas.Render.Style.text);e[t].attr&&n.attr(e[t].attr),e[t].rotate&&n.rotate(e[t].rotate);var r=n.getBBox();Math.sqrt(r.height*r.height+r.width*r.width)}},draw:function(e){var t,n;if("line"==e.type)t=this.svg.path(["M",e.x1,e.y1,"L",e.x2,e.y2]).attr(Smits.PhyloCanvas.Render.Style.line);else if("path"==e.type)t=this.svg.path(e.path).attr(e.attr);else if("circle"==e.type)t=this.svg.circle(e.x,e.y,e.radius).attr({stroke:"red"});else if("text"==e.type){t=this.svg.text(e.x,e.y,e.text).attr(Smits.PhyloCanvas.Render.Style.text),e.attr&&t.attr(e.attr),e.rotate&&t.rotate(e.rotate);var r=t.getBBox();n=Math.sqrt(r.height*r.height+r.width*r.width)}return[t,n]}},Smits.PhyloCanvas.Render.Phylogram=function(){var e,t,n,a,i,s,l,o,h,u,c,d,m,v,f=Smits.PhyloCanvas.Render.Parameters.Rectangular,S=!0,C=0,P=0,p=[],R=function(e,t,n,r){return["M",e,t,"L",n,t,"L",n,r,"L",e,r,"Z"]},x=function(t,n){if(t.len&&0==S&&0==t.children.length&&(C=Smits.Common.roundFloat(C+i,4)),t.children.length>0){var l,o,h,u,c=[];if(t.len&&(l=n,o=n=Smits.Common.roundFloat(n+a*t.len,4),h=C+t.getMidbranchPosition(S)*i,u=h,r=t.red,g=t.green,b=t.blue,e.draw(new Smits.PhyloCanvas.Render.Line(l,o,h,u,r,g,b))),t.name){var d={};if(d=Smits.PhyloCanvas.Render.Style.getStyle("bootstrap","text"),t.uri&&(d.href=t.uri),t.description&&(d.title=t.description),0==t.level)var m=C+t.getMidbranchPosition(S)*i;else var m=u;e.draw(new Smits.PhyloCanvas.Render.Text((o||n)+5,m,t.name,{attr:d}))}if(t.children&&t.children.length)for(var y=0;y<t.children.length;y++){var v=t.children[y];c.push(x(v,n))}for(var R=[],y=0;y<c.length;y++)c[y][0]&&R.push(c[y][0]),c[y][1]&&R.push(c[y][1]);var w=Math.min.apply(null,R),L=Math.max.apply(null,R);e.draw(new Smits.PhyloCanvas.Render.Path(["M",n+1e-4,w,"L",n,w,"L",n,L,"L",n+1e-4,L],{attr:Smits.PhyloCanvas.Render.Style.line}))}else{if(l=n,o=Smits.Common.roundFloat(n+a*t.len,2),h=C,u=C,r=t.red,g=t.green,b=t.blue,t.y=C,p.push(t),e.draw(new Smits.PhyloCanvas.Render.Line(l,o,h,u,r,g,b)),f.alignRight&&e.draw(new Smits.PhyloCanvas.Render.Path(["M",o,h,"L",f.alignPadding+s,u],{attr:Smits.PhyloCanvas.Render.Style.connectedDash})),t.name){var d={};t.style&&(d=Smits.PhyloCanvas.Render.Style.getStyle(t.style,"text")),d["text-anchor"]="start",t.uri&&(d.href=t.uri),t.description&&(d.title=t.description);var k=e.draw(new Smits.PhyloCanvas.Render.Text(f.alignRight?s+f.bufferInnerLabels+f.alignPadding:o+f.bufferInnerLabels,u,t.name,{attr:d}));P=Math.max(k[1],P),Smits.PhyloCanvas.Render.Parameters.mouseRollOver&&Smits.Common.addRaphEventHandler(k[0],"mouseover",Smits.PhyloCanvas.Render.Parameters.mouseRollOver,{svg:e,node:t,x:o,y:u,textEl:k[0]}),Smits.PhyloCanvas.Render.Parameters.mouseRollOut&&Smits.Common.addRaphEventHandler(k[0],"mouseout",Smits.PhyloCanvas.Render.Parameters.mouseRollOut,{svg:e,node:t,x:o,y:u,textEl:k[0]}),Smits.PhyloCanvas.Render.Parameters.onClickAction&&Smits.Common.addRaphEventHandler(k[0],"click",Smits.PhyloCanvas.Render.Parameters.onClickAction,{svg:e,node:t,x:o,y:u,textEl:k[0]})}S&&(S=!1)}return[h,u]},w=function(){y=C+i,u=0,c=f.showScaleBar*a,e.draw(new Smits.PhyloCanvas.Render.Line(u,c,y,y)),e.draw(new Smits.PhyloCanvas.Render.Text((u+c)/2,y-8,f.showScaleBar))},L=function(t,n,r){for(var a=(r&&r.bufferInner?r.bufferInner:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,s=(r&&r.bufferSiblings?r.bufferSiblings*i:0)|(Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings<1?i*Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),l=(r&&r.thickness?r.thickness:0)|Smits.PhyloCanvas.Render.Parameters.binaryChartThickness,o=0;o<p.length;o++){var h=p[o];e.draw(new Smits.PhyloCanvas.Render.Path(R(t+a,h.y-i/2+s/2,t+a+l,h.y+i/2-s/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(h.chart[n],"textSecantBg")}))}return t+a+l},k=function(t,n,r){for(var a,s=[],l=r&&r.bufferInner?r.bufferInner:0|Smits.PhyloCanvas.Render.Parameters.barChartBufferInner,o=r&&r.height?r.height:0|Smits.PhyloCanvas.Render.Parameters.barChartHeight,h=r&&r.width?r.width<1?i*r.width:r.width:0|(Smits.PhyloCanvas.Render.Parameters.barChartWidth<1?i*Smits.PhyloCanvas.Render.Parameters.barChartWidth:Smits.PhyloCanvas.Render.Parameters.barChartWidth),u=0,c=0;c<p.length;c++)s.push(p[c].chart[n]);a=Math.max.apply(null,s),u=Smits.Common.roundFloat(o/a,4);for(var c=0;c<p.length;c++){var d=p[c];e.draw(new Smits.PhyloCanvas.Render.Path(R(t+l,d.y-h/2,t+l+u*d.chart[n],d.y+h/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(d.chart[n],"barChart")}))}return t+l+o};return function(r,u){this.getCanvasSize=function(){return[t,n]},this.getRoot=function(){return u.getRoot()},u.getValidate()&&e.draw(0,0,u.getValidate()),e=r;var c=u.getRoot(),y=u.getNewickLen();if(t=e.canvasSize[0],n=e.canvasSize[1],d=f.bufferX,m=f.paddingX,v=f.paddingY,l=f.minHeightBetweenLeaves,C=v,a=Math.round((t-d-2*m)/y),i=Math.round((n-2*v)/(f.showScaleBar?c.getCountAllChildren():c.getCountAllChildren()-1)),l>i&&(i=l),s=Math.round(t-d-2*m),(Smits.PhyloCanvas.Render.Parameters.binaryCharts.length||Smits.PhyloCanvas.Render.Parameters.barCharts.length)&&(f.alignRight=!0),x(c,m),f.showScaleBar&&w(),o=s+P+f.bufferInnerLabels,Smits.PhyloCanvas.Render.Parameters.binaryCharts.length){var g=Smits.PhyloCanvas.Render.Parameters.binaryCharts;for(var S in g)o=L(o,g[S].chart,g[S])}if(Smits.PhyloCanvas.Render.Parameters.barCharts.length){var b=Smits.PhyloCanvas.Render.Parameters.barCharts;for(var S in b)h=k(o,b[S].chart,b[S])}p=[],bgLabelsHold=[]}}(),Smits.PhyloCanvas.Render.Phylogram.prototype={},Smits.PhyloCanvas.Render.CircularPhylogram=function(){function e(e,t){return t+=x,[Smits.Common.roundFloat(C+e*Math.sin(t*T),4),Smits.Common.roundFloat(P+e*Math.cos(t*T),4)]}function t(e){var t=a(90-e-x);if(t>90&&270>t){t+=180;var n="end"}else var n="start";return[t,n]}function n(t,n,r,i){var s,l=e(t,n),o=e(t,r),h=[],u=0;return s=Math.abs(a(r-n))>180?1:-1,i&&i.invertSecant&&(s*=-1,u=1),i&&i.noMove||h.push("M"),h.push(l[0],l[1],"A",t,t,0,1>s?0:1,u,o[0],o[1]),h}function r(t,n,r,a){var i=[],s=e(n,t),l=e(r,t);return a&&a.noMove||i.push("M"),i.push(s[0],s[1],"L",l[0],l[1]),i}function a(e){for(;e>360||0>e;)e>360?e-=360:0>e&&(e+=360);return e}function i(e,t,r,a){if(!t&&e.length>1)var a=e[3],r=e[2],t=e[1],e=e[0];var i=l("M",n(e,r,a,{noMove:1,invertSecant:0}),"L",n(t,a,r,{noMove:1,invertSecant:1}),"Z");return i}function s(a,i){if(i=i,a.len&&(L?k=b||1:0==a.children.length&&(k=Smits.Common.roundFloat(k+f,4))),a.children.length>0){var o,h,u,d=[];if(o=i,h=i+=Smits.Common.roundFloat(v*a.len,4),a.name,a.children&&a.children.length)for(var m=0;m<a.children.length;m++){var y=a.children[m],g=s(y,i);g>0&&d.push(g)}var S=Smits.Common.roundFloat(Math.min.apply(null,d),4),C=Smits.Common.roundFloat(Math.max.apply(null,d),4);0!=a.level&&c.draw(new Smits.PhyloCanvas.Render.Path(l("M",e(i+.01,S),"L",n(i,S,C,{noMove:!0}),"L",e(i+.01,C)))),a.len&&(u=Smits.Common.roundFloat(S+(C-S)/2,4),c.draw(new Smits.PhyloCanvas.Render.Path(r(u,o,h))))}else if(a.y=k,M.push(a),o=i,h=i=Smits.Common.roundFloat(i+v*a.len),u=k,c.draw(new Smits.PhyloCanvas.Render.Path(r(u,o,h))),c.draw(new Smits.PhyloCanvas.Render.Path(r(u,h,p),{attr:Smits.PhyloCanvas.Render.Style.connectedDash})),a.name){var P=e(p+w.bufferInnerLabels,u),R=t(u),x=R[0],T=R[1],_={};a.style&&Smits.Common.apply(_,Smits.PhyloCanvas.Render.Style.getStyle(a.style,"text")),_["text-anchor"]=T,a.uri&&(_.href=a.uri),a.description&&(_.title=a.description);var O=c.draw(new Smits.PhyloCanvas.Render.Text(P[0],P[1],a.name,{attr:_,rotate:[x,P[0],P[1]]}));a.bgStyle&&B.push([a.bgStyle,u]);var P=e(h,u);Smits.PhyloCanvas.Render.Parameters.mouseRollOver&&Smits.Common.addRaphEventHandler(O[0],"mouseover",Smits.PhyloCanvas.Render.Parameters.mouseRollOver,{svg:c,node:a,x:P[0],y:P[1],textEl:O[0]}),Smits.PhyloCanvas.Render.Parameters.mouseRollOut&&Smits.Common.addRaphEventHandler(O[0],"mouseout",Smits.PhyloCanvas.Render.Parameters.mouseRollOut,{svg:c,node:a,x:P[0],y:P[1],textEl:O[0]}),Smits.PhyloCanvas.Render.Parameters.onClickAction&&Smits.Common.addRaphEventHandler(O[0],"click",Smits.PhyloCanvas.Render.Parameters.onClickAction,{svg:c,node:a,x:P[0],y:P[1],textEl:O[0]}),N=Math.max(O[1],N)}return L&&(L=!1),u}function l(e){for(var t=e,n=1;n<arguments.length;n++)t=t.concat(arguments[n]);return t}function o(){var e=[];if(B.length>0){if(Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList)for(var t=0;t<Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList.length;t++){var n=Smits.PhyloCanvas.Render.Style.jsphylosvgGradientList[t],r=Smits.Common.createGradientEl(n,Smits.PhyloCanvas.Render.Style[n],[C,P,p+N+w.bufferOuterLabels]);c.svg.defs.appendChild(r)}for(var t=0;t<B.length;t++)if(t==B.length-1||B[t][0]!=B[t+1][0]){var e=i(p,p+N+w.bufferOuterLabels,B[t][2]?B[t][2]-f/2:B[t][1]-f/2,B[t][1]+f/2),a=Smits.PhyloCanvas.Render.Style.getStyle(B[t][0],"textSecantBg"),s=c.draw(new Smits.PhyloCanvas.Render.Path(e,{attr:a.type?{}:a}));a.type&&"radialGradient"==a.type&&s[0].node.setAttribute("fill","url(#"+a.name+")"),a.type&&"radialGradient"==a.type&&s[0].node.setAttribute("stroke","none"),s[0].toBack()}else B[t+1][2]=B[t][2]?B[t][2]:B[t][1]}var e=i(p,p+N+w.bufferOuterLabels,(b||1)-f/2,360-f/2),s=c.draw(new Smits.PhyloCanvas.Render.Path(e,{attr:Smits.PhyloCanvas.Render.Style.textSecantBg}));return s[0].toBack(),p+N+w.bufferOuterLabels}function h(n,r,s){for(var l,o=s&&s.bufferInner?parseFloat(s.bufferInner):Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,h=(s&&s.bufferSiblings?s.bufferSiblings*f:0)|(Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings<1?f*Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferSiblings),u=s&&s.thickness?parseFloat(s.thickness):Smits.PhyloCanvas.Render.Parameters.binaryChartThickness,d=(s&&s.disjointed?s.disjointed:!1)|Smits.PhyloCanvas.Render.Parameters.binaryChartDisjointed,m=s&&s.isInternal?s.isInternal:!1,y=!0,v=0;v<M.length;v++){var g=M[v];if(M[v+1]&&g.chart[r]===M[v+1].chart[r]&&!d||"none"==g.chart[r])l||(l=g.y),"none"==g.chart[r]&&(l=0);else{var S=Smits.PhyloCanvas.Render.Style.getStyle(g.chart[r],"textSecantBg");if(m)var C=[p-o-u,p-o,(l?l:g.y)-f/2+(y&&!d?0:h/2),g.y+f/2-(v!=M.length-1||d?h/2:0)];else var C=[n+o,n+o+u,(l?l:g.y)-f/2+(y&&!d?0:h/2),g.y+f/2-(v!=M.length-1||d?h/2:0)];if(S.label){var P=Smits.PhyloCanvas.Render.Style.getStyle(S.labelStyle,"text"),b=e((C[0]+C[1])/2,(C[2]+C[3])/2),R=t((C[2]+C[3])/2),w=a(R[0]+(P.rotate?parseFloat(P.rotate):0)),L=a(90-(C[2]+C[3])/2-x);L>90&&270>L&&(w+=180),P["text-anchor"]||(P["text-anchor"]="middle");var k=c.draw(new Smits.PhyloCanvas.Render.Text(b[0],b[1],S.label,{attr:P,rotate:w}));k[0].toBack()}if(S.borderStyle){var B=Smits.PhyloCanvas.Render.Style.getStyle(S.borderStyle,"textSecantBg"),N=[p,B.fullsize?C[1]:C[0],C[2],C[3]],T=c.draw(new Smits.PhyloCanvas.Render.Path(i(N),{attr:B}));T[0].toBack()}var _=c.draw(new Smits.PhyloCanvas.Render.Path(i(C),{attr:S}));_[0].toBack(),l=0,y=!1}y=!1}return m?n:n+o+u}function u(e,t,n){for(var r,a=[],s=n&&n.bufferInner?parseFloat(n.bufferInner):Smits.PhyloCanvas.Render.Parameters.barChartBufferInner,l=n&&n.height?parseFloat(n.height):Smits.PhyloCanvas.Render.Parameters.barChartHeight?Smits.PhyloCanvas.Render.Parameters.barChartHeight:0,o=n&&n.width?parseFloat(n.width)<1?f*parseFloat(n.width):parseFloat(n.width):0|(Smits.PhyloCanvas.Render.Parameters.barChartWidth<1?f*Smits.PhyloCanvas.Render.Parameters.barChartWidth:Smits.PhyloCanvas.Render.Parameters.barChartWidth),h=0,u=0;u<M.length;u++)a.push(M[u].chart[t]);r=Math.max.apply(null,a),h=Smits.Common.roundFloat(l/r,4);for(var u=0;u<M.length;u++){var d=M[u];d.chart[t]>0&&c.draw(new Smits.PhyloCanvas.Render.Path(i(e+s,e+s+h*d.chart[t],d.y-o/2,d.y+o/2),{attr:Smits.PhyloCanvas.Render.Style.getStyle(d.chart[t],"barChart")}))}return e+s+l}var c,d,m,y,v,f,g,S,C,P,p,b,R,x,w=Smits.PhyloCanvas.Render.Parameters.Circular,L=!0,k=0,M=[],B=[],N=0,T=Math.PI/180;return function(e,t,n){if(this.getCanvasSize=function(){return[d,m]},this.getRoot=function(){return t.getRoot()},t.getValidate())return void e.draw({type:"text",x:0,y:e.canvasSize[1]/3,text:t.getValidate()});c=e;var r=t.getRoot(),a=t.getNewickLen();if(d=c.canvasSize[0],m=c.canvasSize[1],C=d/2,P=m/2,y=Math.min.apply(null,[d,m]),n=w.bufferRadius>1?w.bufferRadius:Smits.Common.roundFloat(y*w.bufferRadius,4),b=w.bufferAngle,S=w.innerCircleRadius,g=w.minHeightBetweenLeaves,x=w.initStartAngle,p=Math.round((y-n-S)/2),v=(p-S)/a,f=Smits.Common.roundFloat((360-b)/r.getCountAllChildren(),4),s(r,S),R=p+N+w.bufferOuterLabels,Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts.length){var i=Smits.PhyloCanvas.Render.Parameters.integratedBinaryCharts;for(var l in i){var L=i[l].bufferInner?i[l].bufferInner:Smits.PhyloCanvas.Render.Parameters.binaryChartBufferInner,k=i[l].thickness?i[l].thickness:Smits.PhyloCanvas.Render.Parameters.binaryChartThickness;R=h(R-k-L,i[l].chart,i[l])}}if(R=o(),Smits.PhyloCanvas.Render.Parameters.binaryCharts.length){var T=Smits.PhyloCanvas.Render.Parameters.binaryCharts;for(var l in T)R=h(R,T[l].chart,T[l])}if(Smits.PhyloCanvas.Render.Parameters.barCharts.length){var _=Smits.PhyloCanvas.Render.Parameters.barCharts;for(var l in _)R=u(R,_[l].chart,_[l])}M=[],B=[]}}(),Smits.PhyloCanvas.Render.CircularPhylogram.prototype={};var XMLObjectifier=function(){var e=function(e){var t="";e&&"string"==typeof e&&(t=e);var n=/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/;return n.test(t)},t={xmlToJSON:function(t){function n(e){return e.replace(/^\s+|\s+$/gm,"")}function r(e){var t=/-/g,n=String(e).replace(t,"_");return n}function a(e,t){if(t.attributes.length>0){var a,i=t.attributes.length-1;e._attributes=[];do a=String(r(t.attributes[i].name)),e._attributes.push(a),e[a]=n(t.attributes[i].value);while(i--)}}function i(t){t.getNodeByAttribute=function(e,t){if(this.length>0){var n,r=this.length-1;try{do if(n=this[r],n[e]==t)return n;while(r--)}catch(a){return!1}return!1}},t.contains=function(e,t){if(this.length>0){var n=this.length-1;try{do if(this[n][e]==t)return!0;while(n--)}catch(r){return!1}return!1}},t.indexOf=function(e,t){var n=-1;if(this.length>0){var r=this.length-1;try{do this[r][e]==t&&(n=r);while(r--)}catch(a){return-1}return n}},t.SortByAttribute=function(t,n){function r(t,n){var r=t[n];return r=e(r)?parseFloat(r):r}function a(e,a){var i,s,l=0;return i=r(e,t),s=r(a,t),s>i?l=-1:i>s&&(l=1),n&&(l="DESC"==n.toUpperCase()?0-l:l),l}this.length&&this.sort(a)},t.SortByValue=function(t){function n(t){var n=t.Text;return n=e(n)?parseFloat(n):n}function r(e,r){var a,i,s=0;return a=n(e),i=n(r),i>a?s=-1:a>i&&(s=1),t&&(s="DESC"==t.toUpperCase()?0-s:s),s}this.length&&this.sort(r);
},t.SortByNode=function(t,n){function r(t,n){var r=t[n][0].Text;return r=e(r)?parseFloat(r):r}function a(e,a){var i,s,l=0;return i=r(e,t),s=r(a,t),s>i?l=-1:i>s&&(l=1),n&&(l="DESC"==n.toUpperCase()?0-l:l),l}this.length&&this.sort(a)}}function s(e,t){var l,o,h,u="";if(!t)return null;if(t.attributes.length>0&&a(e,t),e.Text="",t.hasChildNodes()){var c=t.childNodes.length-1,d=0;do switch(o=t.childNodes[d],o.nodeType){case 1:e._children=[],l=o.localName?o.localName:o.baseName,l=r(l),u!=l&&e._children.push(l),e[l]||(e[l]=[]),h={},e[l].push(h),o.attributes.length>0&&a(h,o),e[l].contains||i(e[l]),u=l,o.hasChildNodes()&&s(h,o);break;case 3:e.Text+=n(o.nodeValue);break;case 4:e.Text+=n(o.text?o.text:o.nodeValue)}while(d++<c)}}try{if(!t)return null;var l={};l.typeOf="JSXBObject";var o=9==t.nodeType?t.documentElement:t;if(l.RootName=o.nodeName||"",3==t.nodeType||4==t.nodeType)return t.nodeValue;(function(){var e={activate:function(){var e=[];return e&&(e.getNodesByAttribute=function(t,n){if(e&&e.length>0){var r,a=[],i=e.length-1;try{do r=e[i],r[t]===n&&a.push(r);while(i--);return a.reverse(),a}catch(s){return null}return null}},e.getNodeByAttribute=function(t,n){if(e&&e.length>0){var r,a=e.length-1;try{do if(r=e[a],r[t]===n)return r;while(a--)}catch(i){return null}return null}},e.getNodesByValue=function(t){if(e&&e.length>0){var n,r=[],a=e.length-1;try{do n=e[a],n.Text&&n.Text===t&&r.push(n);while(a--);return r}catch(i){return null}return null}},e.contains=function(t,n){if(e&&e.length>0){var r=e.length-1;try{do if(e[r][t]===n)return!0;while(r--)}catch(a){return!1}return!1}},e.indexOf=function(t,n){var r=-1;if(e&&e.length>0){var a=e.length-1;try{do e[a][t]===n&&(r=a);while(a--)}catch(i){return-1}return r}},e.SortByAttribute=function(t,n){function r(e,t){var n=e[t];return n=bam.validation.isNumeric(n)?parseFloat(n):n}function a(e,a){var i,s;i=r(e,t),s=r(a,t);var l=s>i?-1:i>s?1:0;return n&&(l="DESC"===n.toUpperCase()?0-l:l),l}e&&e.length>0&&e.sort(a)},e.SortByValue=function(t){function n(e){var t=e.Text;return t=bam.validation.isNumeric(t)?parseFloat(t):t}function r(e,r){var a,i;a=n(e),i=n(r);var s=i>a?-1:a>i?1:0;return t&&(s="DESC"===t.toUpperCase()?0-s:s),s}e&&e.length>0&&e.sort(r)},e.SortByNode=function(t,n){function r(e,t){var n=e[t][0].Text;return n=bam.validation.isNumeric(n)?parseFloat(n):n}function a(e,a){var i,s;i=r(e,t),s=r(a,t);var l=s>i?-1:i>s?1:0;return n&&(l="DESC"===n.toUpperCase()?0-l:l),l}e&&e.length>0&&e.sort(a)}),e}};return e})();return s(l,o),t=null,o=null,l}catch(h){return null}},textToXML:function(e){var t=null;try{t=document.all?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser,t.async=!1}catch(n){throw new Error("XML Parser could not be instantiated")}var r;try{r=document.all?t.loadXML(e)?t:!1:t.parseFromString(e,"text/xml")}catch(n){throw new Error("Error parsing XML string")}return r}};return t}();
