<script>
export default{
  data(){
    return{
    }
  },
  props:[
    'loggedin', 'loggedUser'
  ]
}
</script>

<template>
  <div>
    <div class="container py-4">
  
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/nishimuraya-honkan-ryokan-kinosaki-onsen.png" class="d-block" alt="..." style="width: 100%; height: 50%; object-fit:cover">
          </div>
          <div class="carousel-item">
            <img src="../assets/575891f229b37_575890939ed10_149125113 (1).png" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../assets/luxury-ryokan-onsen-japan-promo.png" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <br>

      <div class="p-5 mb-4 bg-light rounded-3 checkout" v-if="loggedIn">
        <div class="container-fluid py-5" >
          <h1 class="display-5 fw-bold white-text">Kamar Berapa gitu</h1>
          <p class="col-md-8 fs-4 white-text">Tipe kelas kamar</p>
          <button class="btn btn-danger btn-lg box-shadow" type="button">Self Check Out</button>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-bg-dark rounded-3">
            <h2 class="fw-bold">Pemesanan</h2>
            <p>Silahkan Melakukan Pemesanan</p>
            <button class="btn btn-outline-light" type="button">Example button</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <h2>Jenis Kamar</h2>
            <p>Daftar jenis kamar yang tersedia pada Shukuhaku</p>
            <button class="btn btn-outline-secondary" type="button">Example button</button>
          </div>
        </div>
      </div>

      <br>
      
  
      <footer class="pt-3 mt-4 text-muted border-top">
        &copy; 2022
      </footer>
    </div>
  </div>
</template>

<style>
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .checkout {
    background-image: url("../assets/header.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .white-text {
    color: white;
    text-shadow: 5px 5px 10px #000000;
  }

  .box-shadow{
    box-shadow: 5px 5px 10px #000000;
  }
</style>
