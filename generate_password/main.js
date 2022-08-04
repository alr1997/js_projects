let password=['','','',''];
const numbers="0123456789";
const special="#$!-_";
const uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercase="abcdefghijklmnopqrstuvwxyz";
const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$!-_"
const char_len=chars.length;

//****** HTML & CSS containt ********//

var body=document.getElementsByTagName('body')[0];
body.style.backgroundColor="#4a3333";
body.style.position-'relative';

var h1=document.createElement("h1");
h1.innerHTML="Password Generator"
h1.style='text-align:center; padding:20px; color:#d3adad;'
document.body.appendChild(h1);

const btn=document.createElement('button');
btn.setAttribute("style",'background-color:#8f6363; cursor:pointer; border-radius:20px; padding:10px 20px; border:2px solid #8f6363;display:block;margin:auto;');
btn.innerHTML="Generate";
document.body.appendChild(btn);

const div=document.createElement("div");
div.style.backgroundColor="#d3adad";
div.style.width="300px";
div.style.minHeight="100px";
div.style.display="block";
div.style.margin="auto";
div.style.marginTop="30px";
document.body.appendChild(div);

//****** Listener ********//

btn.addEventListener('click',generate);

let pass=document.createElement("p");
pass.style.lineHeight="30px";
pass.style.margin="20px";

function generate(event){
    let pas_leng=[8+takeIt(5),8+takeIt(5),8+takeIt(5),8+takeIt(5)];     //length shpuld be 8-12 characters (12 included)

    //setting random lengh of password AND output genereted passwords

    for (let i=0;i<4;i++){
        password[i]="";
        for (let j=0;j<pas_leng[i];j++){
            password[i]+=chars[takeIt(char_len)];
        }
        password[i]=test(password[i]);
    }

    //test if we have same character at same position at different passwords

    password=test_position(password);

    let str="";
    for (let i=0;i<4;i++){
        str+="Password "+ (i+1) + ": "+password[i] + "<br>";
    }
    pass.innerHTML=str;
    div.appendChild(pass)

//****** Testing posisions ********//

console.log(password);

}

function takeIt(num){
    return Math.floor(Math.random()*num);
}

//****** Testing password for following rules ********//

//more simple way could be generate password from the beggining, but i was thinking that changing random character from the password could be more quick

function test(str){
    console.log(str);

    let num=false,up=false,low=false,spec=false, all=false;
    for(let i=0;i<str.length;i++){
        if(numbers.includes(str[i])){
            num=true;
        }else if(uppercase.includes(str[i])){
            up=true;
        }else if(lowercase.includes(str[i])){
            low=true;
        }else if(special.includes(str[i])){
            spec=true;
        }
        if(num===true && up===true && low===true && spec===true){
            return str;
        }
    }

    if(num===false){
        str=changeString(str, takeIt(str.length), numbers[takeIt(numbers.length)]);
        console.log("Number miss");
        str=test(str);
    }else if(up===false){
        str=changeString(str, takeIt(str.length), uppercase[takeIt(uppercase.length)]);
        console.log("uppercase miss");
        str=test(str);
    }else if(low===false){
        str=changeString(str, takeIt(str.length), lowercase[takeIt(lowercase.length)]);
        console.log("lowercase miss");
        str=test(str);
    }else if(spec===false){
        str=changeString(str, takeIt(str.length), special[takeIt(special.length)]);
        console.log("special miss");
        str=test(str);
    }else if(position>0){
        str=changeString(str, takeIt(str.length), chars[takeIt(chars.length)]);
        console.log("at some position we have the same char");
        str=test(str);
    }

    return str;
}

function changeString(str,index,letter){
new_str="";
    console.log(index);
    console.log(letter);
for(let i=0;i<str.length;i++){
    if(index===i){
        new_str+=letter;
    }else{
        new_str+=str[i];
    }
}
return new_str;
}

function test_position(pass){
for(let j=0;j<12;j++){
    for (let i=0; i<4;i++){
        for(let k=3; k>i;k--){
            if (pass[i].length<=j || pass[k].length<=j){
                console.log("pass");
                continue;
            }

            // I choose to change the similar character with character at the same type, in order not to broke others rules

            if (pass[i][j]===pass[k][j]){
                if(numbers.includes(pass[k][j])){
                    pass[k]=changeString(pass[k],j,numbers[takeIt(numbers.length)]);
                    console.log("changed");
                }else if(uppercase.includes(pass[k][j])){
                    pass[k]=changeString(pass[k],j,uppercase[takeIt(uppercase.length)]);
                    console.log("changed");
                }else if(lowercase.includes(pass[k][j])){
                    pass[k]=changeString(pass[k],j,lowercase[takeIt(lowercase.length)]);
                    console.log("changed");
                }else if(special.includes(pass[k][j])){
                    pass[k]=changeString(pass[k],j,special[takeIt(special.length)]);
                    console.log("changed");
                }
                k=3;
            }
        }
    }
}
    return pass;
}