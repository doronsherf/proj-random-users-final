/* --------------------------------------------------------
javascript file
project: Generate Random Users

version: 1.0
last modified: 
author: Doron 
email: sherfdo@gmail.com
website: http://

----------------------------------------------------------*/



/*\ The fetch() method take URL (URL: the path to the resource). 
|*| It returns a Promise that resolves to the Response to that request, whether it is successful or not.
|*| It import { stringify } from 'querystring';
|*| fetch() method documentation see: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
\*/

$(document).ready(function(){

    /* *** INITIAL VARIABLES *** */
    let url = 'https://randomuser.me/api/?results=0';
    let get1_btn = document.querySelector("#gnrt_btn"); // get 1 user from URL(API server)
        get1_btn.addEventListener("click",get1user);

    let get10_btn = document.querySelector("#gnrt10_btn");// get 10 users from URL
        get10_btn.addEventListener("click",get10users);
        
    var vheader  = document.querySelector("#header");
    var vmain_btns  = document.querySelector("#main_btns");
    var vdsply_area  = document.querySelector("#display_area");

    var prsons_arr = [];  // All persons array 

    /* INIT = INITIALIZATION */
    window.addEventListener('load',  function() { retrv_from_lcl_strg();}); 
    /* INIT VARIABLES */
    var no_prsons_yet = true; 

    /* MAIN FUNCTION: fetch_info: handle AJAX related to the API server */
    function fetch_info(url){

        fetch(url) // The fetch() method is a build in HTML/JavaScript Fetch API
            .then((response) => response.json()) // 1.JSON.parse data from server
            .then(function(data){   // 2.using data from server
                data.results.forEach(prson => {//create array(results) of 'person'
                        make_prson1(prson);
                        // the function do 4 actions:
                        // 1) inject values to prson1 properties
                        // 2)func. 'make_card(prson1)': dinamicly create and append single user card. 
                        // 3)func.'add2prsons_arr(prson1)':update the array. 
                        // 4)func.'sav2lcl_storg': save to local storage
                });// 'forEach person' close
            });   // '.then2' close
        }; // 'fetch_info()' close 

    /*inject values*/ 
    function make_prson1(prson){ // inject values to prson1 properties
        let prson1 = {};  // 1 person var
            prson1.pic = prson.picture.large;
            prson1.name = prson.name.first + " " +prson.name.last;
            prson1.gender = prson.gender;
            prson1.age = prson.dob.age;
            prson1.mail =prson.email;
            prson1.full_txt = prson1.pic + prson1.name + prson1.gender + prson1.age + prson1.mail;// srting to be the key of each person

        // card: person(user) displayed element.
        make_card(prson1); // create a card for each user 
        add2prsons_arr(prson1);//add to array card info (including the key:full_txt)
        sav2lcl_storg(prsons_arr); //Save to Local storag
    } // make_prson1() close


    /*  function 'make_card': dinamicly create a card for each single user and append it to 'dsply_area'
    card: prson(user) displayed element.*/
    function make_card(prson_data){
        
        /* card : The graphic Elemnt to contain a prson(user) info  */
        let card = document.createElement("div"); 
            card.id = "card";

        /* *** CARD Variables *** */
        let c_pic = document.createElement("img");// c_pic: card picture
            c_pic.id = "c_pic";
        let c_name = document.createElement("h5");// c_name: card name
            c_name.id = "c_name";            
        let c_gender = document.createElement("span");
            c_gender.id = "c_gender";
        let c_age = document.createElement("span");
            c_age.id = "c_age";
        let c_mail =document.createElement("span");
            c_mail.id = "c_mail";
        let card_btns = document.createElement("div");
            card_btns.id = "card_btns";
        let delet_btn = document.createElement("button");
            delet_btn.id = "delet_btn";
            delet_btn.innerText = "Delete";
            delet_btn.className = "btn btn-danger btn-sm"  // bootstrap styling 
            delet_btn.style.backgroundColor = "red";
        let edit_btn = document.createElement("button");
            edit_btn.id = "edit_btn";
            edit_btn.innerText = "Edit"; 
            edit_btn.className = "btn btn-danger btn-sm"; // bootstrap styling 
            edit_btn.style.backgroundColor = "green";
        let c_full_txt = document.createElement("span"); // card full text: string appended to card
            c_full_txt.id = "c_full_txt";

        /*inject values*/ 
        /*inject person1 values to card variables*/ 
        c_pic.src = prson_data.pic
        c_name.innerText = prson_data.name;
        c_gender.innerText = "Gender: " +  prson_data.gender;
        c_age.innerText = "Age: " + prson_data.age;
        c_mail.innerText = "Email: " + prson_data.mail;
        c_full_txt.innerText = prson_data.full_txt
        vdsply_area.appendChild(card); // pin card on the display_area

        /* Appending "person card" children*/
        card.appendChild(c_full_txt);    // child No 0
        card.appendChild(c_pic);    // child No 1
        card.appendChild(c_name);   // child No 2
        card.appendChild(c_gender); // child No 3
        card.appendChild(c_age);    // child No 4
        card.appendChild(c_mail);   // child No 5
        card.appendChild(card_btns);// child No 6 
        card_btns.appendChild(delet_btn);// child No 1 of 'btns'
        card_btns.appendChild(edit_btn); // child No 2(last) of 'btns'

        let name_edit = document.createElement("INPUT"); // name_edit: a var to be edited in 'editing by user' mode
            card.appendChild(name_edit); // child No 7
            name_edit.id = "name_edit";  
            name_edit.value = c_name.innerText;  
            name_edit.style.display = "none";

        let mail_edit =document.createElement("INPUT"); // mail_edit: a var to be edited in 'editing by user' mode
            card.appendChild(mail_edit); // child No 8
            mail_edit.id = "mail_edit";
            mail_edit.value = (c_mail.innerText).slice(7);// slicing the 'Email: '(7 chars)
            // mail_edit.innerHTML = 'New mail:<input type="email" value="' + (mail_edit.innerText) +'">'

            mail_edit.style.display = "none";

        /* card events */
        card.addEventListener("mouseover",   
            function() {card_btns.style.opacity = 1;} 
        );
        card.addEventListener("mouseout", 
            function() { card_btns.style.opacity = 0.75;}
        );
        /* card class */
         card.className = "well"; // bootstrap style

        /* card picture style */
        c_pic.className="img-rounded"; 
        c_pic.alt = "Picture is missing";

        /* The "Delete" div events */
        delet_btn.addEventListener("click", 
            function() { del_user(delet_btn.parentElement.parentElement) } ); 

        delet_btn.addEventListener("mouseover", 
            function() { delet_btn.style.cursor = "pointer";}
        ); 
        delet_btn.addEventListener("mouseout", 
            function() { delet_btn.style.cursor = "auto" }
        );

        /* The "edit_btn" events */
        edit_btn.addEventListener("click", 
            function() { 
                var card_const = edit_btn.parentElement.parentElement; 
                var card_tmp = card_const.cloneNode(true) // 'deep' is set to true to enable duplica (clone) all descendants(children)
                card_tmp.className = "card_edit well"
                card_tmp.id = "card_tmp"
                card_tmp.style.width = "200px";
                card_tmp.style.height = "300px";

                card_tmp.children[1].style.marginLeft = "30px" // pic
                card_tmp.children[2].style.display = "none" // name
                card_tmp.children[5].style.display = "none" // mail
                card_tmp.children[6].style.display = "inline" //  card_btns child No 6

                card_tmp.children[6].firstChild.innerText = "Cancel" // 'Delete' btn is changed to 'Cancel' btn
                card_tmp.children[6].firstChild.style.backgroundColor = "gold"
                card_tmp.children[6].firstChild.addEventListener("click", function() {rglr_view()}); 

                card_tmp.children[6].lastChild.innerText = "Update"  // 'Edit' btn is changed to 'Update' btn 
                card_tmp.children[6].lastChild.addEventListener("click", function() {check_and_updat()}); 

                card_tmp.children[7].style.display = "inline" // name_edit: input box 
                card_tmp.children[8].style.display = "inline" // mail_edit: input box
                /* Changing the veiw port to 'editing mode'*/
                vmain_btns.style.display = "none";
                vdsply_area.style.display = "none";
                vheader.appendChild(card_tmp);
                card_tmp.style.display = "flex"; 

                function check_and_updat(){
                    var new_name = document.getElementById("card_tmp").children[7].value;//the typed NAME from the 'input box'
                    var new_mail = document.getElementById("card_tmp").children[8].value;//the typed E-mail from the 'input box'
                    if(  (not_empty(new_name)) && (mail_is_ok(new_mail))  ) {
                        updat()
                    }

                    function updat(){
                        name_edit.value = new_name;
                        c_name.innerText = new_name;

                        mail_edit.value = document.getElementById("mail_edit").value;//the typed mail from the 'input box'
                        mail_edit.innerText = "Email: " + mail_edit.value;
                        c_mail.innerText = mail_edit.innerText;

                        let prson1 = {};
                            prson1.pic = c_pic.src;
                            prson1.name = c_name.innerText;
                            prson1.gender = c_gender.innerText.substring(8); 
                            prson1.age = c_age.innerText.substring(5); 
                            prson1.mail = c_mail.innerText.substring(6); 
                            prson1.full_txt = c_full_txt.innerText ; 

                            card_tmp.remove(); // delete the temporary card (was used in the 'edit mode')

                            let i = delet_from_prsons_arr(prson1.full_txt) // delet the original person record from array
                            prsons_arr.splice(i,0,prson1); // inserting the edited person record to the array
                            sav2lcl_storg(prsons_arr);
                            rglr_view()
                    
                    } // 'updat()' close
                } // 'check&updat()' close

                function rglr_view(){ // regular view
                    location.reload();
                }

            } // edit_btn func close
        ); // edit_btn addEventL click close

        edit_btn.addEventListener("mouseover", 
            function() { edit_btn.style.cursor = "pointer"; }
        ); 
        edit_btn.addEventListener("mouseout", 
            function() { edit_btn.style.cursor = "auto" }
        );

    } // 'make_card()' close


    function del_user(usr2del){ 
        console.log("del");
        delet_from_prsons_arr(usr2del.firstChild.innerText); // 1.delet from the persons array by the key(full_txt)
        sav2lcl_storg(prsons_arr) // 2.update local storage
        usr2del.remove() // 3.delet the card from viewport
    } 

    function retrv_from_lcl_strg() { // retrieve from Local storage
       if (localStorage.getItem("prsons111") == null) {  
           no_prsons_yet = true; } 
           else {no_prsons_yet = false;}

        if ( no_prsons_yet === false ) { 
            prsons_arr = JSON.parse( localStorage.getItem("prsons111") );
            for (var i=0 ; i<prsons_arr.length ; i++) { // create and append a card for each single user  
            make_card(prsons_arr[i]);
            }
        }
    }//retrv_from_lcl_strg() close


    function sav2lcl_storg(arr) { // Save to Local storage
        var strng_arr = JSON.stringify(arr);
        localStorage.setItem("prsons111",strng_arr);
    }

    function add2prsons_arr(prson){ // add person to 'persons-array'
        prsons_arr.push(prson); 
    }

    function delet_from_prsons_arr(prson2del_full_txt){    // delet person from 'persons-array'

        for (var i=0 ; i< prsons_arr.length ; i++) {
            x= prsons_arr[i].full_txt ; 
            if (x  === prson2del_full_txt) {  
                prsons_arr.splice(i,1); // delete 'prson2del' and reposition the rest array items to "close the hole"
                return i;// returns the position(i) of the deleted item
            }
        }
        sav2lcl_storg(prsons_arr); //3. update local storage
    } // 'delet_from_prsons_arr()' close

    function get1user(){ 
        console.log("get1");
        fetch_info("https://randomuser.me/api/?results=1&inc=picture,name,gender,dob,email&noinfo");
    }

    function get10users(){ 
        console.log("get10");
            fetch_info("https://randomuser.me/api/?results=10&inc=picture,name,gender,dob,email&noinfo");
    }
    /* replace 1 person in the client with new random person from the API server */
    document.getElementById("rplac1_chck_btn").onchange = function() { // replace 1 person checkbox
    let chang_btn = document.getElementById("rplac1_chck_btn");
        if (chang_btn.checked) {
            alert ("One person would be automaticly replaced every 10 seconds! \n To Stop: UNcheck the checkbox");
            var intrvl = window.setInterval(rplac1, 10000); // excute 'replace function' every 10 seconds
        }
        else {
            alert ("The automatic replacement is stoped!");// When the check box is UNchecked
            // window.clearInterval(intrvl); // window.clearInterval does not work in live server state in chrom!
            location.reload();
        }
    };

    function rplac1(){ // replace 1 user every 10 seconds
        del_user(vdsply_area.firstChild);
        get1user();
    }


    function not_empty(string2tst) { //  validate Empty Form Field
        let empty =( string2tst.trim() === "" ) ;
        let too_short = (string2tst.length < 3)

        if(empty) {
            alert("Oops..  String of Empty Charecters (spaces) Is Not Allowed \n Please Fill In Valid Characters");
            document.getElementById("name_edit").focus();
            return false;
        }
        else if(too_short) {
                alert("Oops..Too Short.. \n Name and Email must be of more than 2 characters length!");
                document.getElementById("name_edit").focus();
                return false;
            }
            else {return true};
    };


    /* Validate Email Address */
    function mail_is_ok(mail2tst){
        if (not_empty(mail2tst)) {
            let at_postn=mail2tst.indexOf("@");
            let dot_postn=mail2tst.lastIndexOf(".");
            if (  at_postn<2 ||(dot_postn - at_postn)<3 || (mail2tst.length - dot_postn)<3   ){
                alert("Please Enter a valid e-mail Address");
                document.getElementById("mail_edit").focus();
                return false;
            }
            else { return true;}
        }
    }

}); // '(document).ready(function()' close

