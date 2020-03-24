function getLink(){
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.type="text/css";
    document.head.append(link);
    return link;
}
let link = getLink();
export function targgerCss(href){
    link.href = href;
}