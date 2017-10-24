$(function () {

    firebase.initializeApp({
        apiKey: 'AIzaSyBJKQnNW-VN7RJlBtp_kQrMsZS6ElNtdxk',
        authDomain: 'demowebclient.firebaseapp.com',
        projectId: 'demowebclient'
    });

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    $('#save').click(function () {

        var username = $('#username').val();
        var fullname = $('#fullname').val();
        var mobileno = $('#mobileno').val();

        db.collection("users").add({
            username: username,
            fullname: fullname,
            mobileno: mobileno
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);                

                $('#tablebody').empty();

                db.collection("users").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {

                        console.log(doc.id, " => ", doc.data());
                        var username = doc.username;
                        var fullname = doc.fullname;
                        var mobileno = doc.mobileno;

                        var row = "<tr>" +
                        "<th scope='row'>" + doc.id + "</th>" +
                        "<td>" + doc.data().username + "</td>" +
                        "<td>" + doc.data().fullname + "</td>" +
                        "<td>" + doc.data().mobileno + "</td>" +
                        "</tr>"

                        $('#tablebody').append(row);

                    });
                });
            
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    });


})