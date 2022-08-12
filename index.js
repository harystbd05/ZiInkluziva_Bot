const fetch = require ('node-fetch');
const puppeteer = require ('puppeteer');
const fs = require ('fs');
const readlineSync = require ('readline-sync');
const cheerio = require ('cheerio');
const chalk = require ('chalk');
const moment = require ('moment');

const getData = () => new Promise((resolve,reject)=>{
    fetch('https://name-fake.com/id_ID', {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-GB,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Cookie': 'PHPSESSID=78fd62f29ab0d35bb777ca6edfffb335; prefetchAd_2861429=true',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'TE': 'trailers'
        }
 })
 .then(ress => ress.text())
 .then(async result => {
     const $ = await cheerio.load(result);
    const firstName = $('div[id=copy1]').text();
    const lastName = $('div[id=copy2]').text();
    const ressEmail = $('div[id=copy4]').text().split("@");
    const dnsEmail = ressEmail[0] + Math.floor(Math.random() * 1000)+ "@getnada.com";
    
     resolve({
         firstName: firstName,
         lastName: lastName,
         email: dnsEmail
     })
 }).catch(err => reject(err))
});

const registerAPI = (nama,email,password,cpassword, phone) => new Promise ((resolve, reject) => {
    fetch ('https://testenet.mustblockchain.com/ziwallet/user/register', {
        method: 'POST',
        headers:{
            'Host': 'testenet.mustblockchain.com',
            'Content-Length': '134',
            'Sec-Ch-Ua': '"Chromium";v="103", ".Not/A)Brand";v="99"',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer undefined',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Origin': 'https://ziwallet.inkluziva.org',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://ziwallet.inkluziva.org/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        body: JSON.stringify (
            {"name":nama,"email":email,
            "password":password,"confirmPassword":cpassword,
            "phone":phone}
        )
    })
    .then (ress => ress.json())
    .then (result => {
        resolve (result)
    })
    .catch (err => reject (err))
});

const getLogin = (email, password, token) => new Promise ((resolve, reject) => {
    fetch ('https://testenet.mustblockchain.com/ziwallet/authentication/authenticate',{
        method: 'POST',
        headers: {
            'Host': 'testenet.mustblockchain.com',
            'Content-Length': '57',
            'Sec-Ch-Ua': '"Chromium";v="103", ".Not/A)Brand";v="99"',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Origin': 'https://ziwallet.inkluziva.org',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://ziwallet.inkluziva.org/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        body: JSON.stringify(
            
                {"email":email,"password":password, "token" : token}
            
        )
    })
    .then (ress => ress.json())
    .then (result => {
        resolve (result)
    })
    .catch (err => reject (err))
});

const submitAirdrop = (linkedin, instagram, twitter, facebook, token) => new Promise ((resolve, reject) => {
    fetch ('https://testenet.mustblockchain.com/ziwallet/airdrop/register', {
        method: 'POST',
        headers : {
            'Host': 'testenet.mustblockchain.com',
            'Content-Length': '114',
            'Sec-Ch-Ua': '"Chromium";v="103", ".Not/A)Brand";v="99"',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYzMTg0NjgwZDk1YWQ1ZTQ2ZmZmMDYiLCJlbWFpbCI6ImhhcnkwNTA2MjAwMkBnbWFpbC5jb20iLCJ3YWxsZXRBZGRyZXNzIjoiMHhhZTRmMTI1OTk5MDA1MzYxZjM4QTQyYjZFNjExNkJiQjAwNzdGNjlCIiwiaWF0IjoxNjYwMDk4NjY3LCJleHAiOjE2NjAxMjc0Njd9.oNY8yM0H8JKo5YQJKvqLFy_QZTHB5YYh_M2YyMi-kps',
            'Authorization': `Bearer ${token}`,
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Origin': 'https://ziwallet.inkluziva.org',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://ziwallet.inkluziva.org/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        body: JSON.stringify (
            {"linkedln":linkedin,"instagram":instagram,
            "twitter":twitter,"facebook":facebook}
        )
    })
})

const randstring = length => {
    var text = "";
    var possible =
        "123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};


const random4number = Math.floor(1000 + Math.random() * 9000);
const random2number = Math.floor(Math.random() * 90 + 10);

(async () => {

    
  const berapaAcc  = readlineSync.question("Mau Berapa Akun ? ");
  for (let index = 0; index < parseInt(berapaAcc); index++) {
    const getDatanya = await getData();
    const firstNamee = getDatanya.firstName;
    const lastNamee = getDatanya.lastName;
    const fullName = `${firstNamee} ${lastNamee}`;
    const email = getDatanya.email;
    const password = "Assist123";
    const cpassword = password;
    
    const linkedin = "@" + lastNamee + random2number;
    const instagram = "@" + lastNamee + "." + random2number;
    const twitter = "@" + firstNamee + random4number;
    const facebook = fullName;
    const phone = "0812" + await randstring(8);
    
    const insertData = await registerAPI(fullName, email, password,cpassword, phone);
    // console.log(insertData);
    
    if (insertData.success === true) {
    
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Nama Akun `));
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Email Akun `));
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Telpon Akun `));
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Akun Linkedin `));
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Akun Instagram `));
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Akun Twitter `));
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Process Input Akun Facebook `));
    }
    
    
    if (insertData.success === true) {
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Akun Berhasil Dibuat, Silahkan Lanjut !`))
    } else {
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.red(`Akun Gagal Dibuat !`));
    }
    
    const login = await getLogin(email, password);
    // console.log(login);
    
    if (login.success === true) {
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Login Sukses`));
    } else {
        console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Login Gagal`));
    }
    
    const getBearerToken = login.data.token;
    bearerToken = getBearerToken;
    // console.log(bearerToken);
    
    
    console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green(`Bearer Token : ${bearerToken} `));
    const MoveData =  `${fullName} | ${email} | ${phone} | ${linkedin} | ${instagram} | ${twitter} | ${facebook}\n`;
    if (MoveData) {
        console.log(`[ ${moment().format("HH:mm:ss")} ]`,chalk.yellow(`Memindahkan Data Akun Success`));
        console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.white(`Process Robot Selesai, Semua Data berhasil dipindahkan !`));
        const MoveResult = fs.appendFileSync('dataresult.txt', MoveData);
    }

    const insertDataAirdrop = await submitAirdrop (linkedin, instagram, twitter, facebook, bearerToken);
    // console.log(insertDataAirdrop);

    if (insertDataAirdrop === 'undefinied' ) {
        while (berapaAcc) {
            console.log(`Berhasil Diulang`);
        }
    }
  }

})
();