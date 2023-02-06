<template>
  <input type="checkbox" id="nav-toggle" />
  <div class="sidebar">
    <div class="sidebar-brand">
      <h2>
        <span class="fas fa-address-book"></span> <span>IUBENDA - ADMIN</span>
      </h2>
    </div>

    <div class="sidebar-menu">
      <ul>
        <li>
          <router-link to="/"
            ><span class="fa fa-home"></span>
            <span>Dashboard</span></router-link
          >
        </li>

        <li>
          <router-link to="/create-company" class="active"
            ><span class="fas fa-address-card"></span>
            <span>Create company</span></router-link
          >
        </li>
        <li>
          <router-link to="/company-list"
            ><span class="fa fa-clipboard"></span>
            <span>Company List</span></router-link
          >
        </li>
        <li>
          <router-link to="/create-people"
            ><span class="fa fa-user"></span>
            <span>Create People</span></router-link
          >
        </li>
        <li>
          <router-link to="/people-list"
            ><span class="fa fa-users"></span>
            <span>People List</span></router-link
          >
        </li>

        <li>
          <a v-on:click="logOut" href="#"
            ><span class="fa fa-sign-out"></span> <span>Logout</span></a
          >
        </li>
      </ul>
    </div>
  </div>

  <div class="main-content">
    <header>
      <h2>
        <label for="nav-toggle">
          <span class="fa fa-bars"></span>
        </label>

        create Company
      </h2>

      <div class="search-wrapper">
        <span class="fa fa-search"></span>
        <input type="search" name="" placeholder="Search here" />
      </div>

      <div class="user-wrapper">
        <img src="../../assets/noimage.jpg" width="40px" height="40px" alt="" />
        <div>
          <h4>Saheed Lasisi</h4>
          <small>Super admin</small>
        </div>
      </div>
    </header>

    <main>
      <div class="recent-grid-others">
        <div class="projects">
          <div class="card">
            <div class="card-header">
              <h2>create Company</h2>
            </div>
            <div class="card-body">
              <div class="main_form">
                <div :class="alert_status">{{ error_msg }}</div>
                <label for="name">Company Name</label>
                <input
                  type="text"
                  v-model="company.company_name"
                  placeholder="Company Name"
                />

                <label for="email">Company Emaill</label>
                <input
                  type="email"
                  v-model="company.company_email"
                  placeholder="Company Email"
                />

                <label for="phone">Company Phone</label>
                <input
                  type="number"
                  v-model="company.company_phone"
                  placeholder="Company Phone"
                />

                <label for="address">Company Address</label>
                <input
                  type="text"
                  v-model="company.company_address"
                  placeholder="Company Address"
                />

                <label for="website">Company Webiste</label>
                <input
                  type="text"
                  v-model="company.company_website"
                  placeholder="Company Website"
                />

                <input v-on:click="createBtn" type="submit" value="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "createCompany",
  data() {
    return {
      alert_status: "",
      error_msg: "",
      company: {
        company_name: "",
        company_email: "",
        company_phone: "",
        company_address: "",
        company_website: "",
      },
    };
  },
  methods: {
    async createBtn() {
      // console.warn(this.company);
      if (this.company.company_name == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Company Name field is required!";
      } else if (this.company.company_email == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Company Email field is required!";
      } else if (this.company.company_address == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Company Address field is required!";
      } else if (this.company.company_phone == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Company Phone field is required!";
      } else if (this.company.company_website == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Company Website field is required!";
      } else {
        //

        const result = await axios.post(
          "http://localhost/iubenda_backend/api/admin/company/create.php",
          {
            name: this.company.company_name,
            email: this.company.company_email,
            phone: this.company.company_phone,
            address: this.company.company_address,
            website: this.company.company_website,
          }
        );
        if (result.data.message == "success" && result.status == 200) {
          this.alert_status = "alert-success";
          this.error_msg = result.data.message;
          this.company.company_name = "";
          this.company.company_email = "";
          this.company.company_phone = "";
          this.company.company_address = "";
          this.company.company_website = "";
        } else {
          this.alert_status = "alert-danger";
          this.error_msg = result.data.message;
        }
      }
    },
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },
    loadData() {
      let tokens = localStorage.getItem("tokens");
      if (tokens == null) {
        this.$router.push({ name: "LogIn" });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
@import "../../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
