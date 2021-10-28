// Confirmation de commande //
letOrderId();

function letOrderId(){

    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    //Afficher le numéro de commande //
    document.getElementById("orderId").innerText = id;
};
  