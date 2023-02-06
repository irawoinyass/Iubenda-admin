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
          <router-link to="/create-company"
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
          <router-link to="/create-people" class="active"
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

        create People
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
              <h2>create People</h2>
            </div>
            <div class="card-body">
              <div class="main_form">
                <div :class="alert_status">{{ error_msg }}</div>
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  v-model="people.name"
                  placeholder="Name"
                />

                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  v-model="people.email"
                  placeholder="Email Address"
                />

                <label for="gender">Gender</label>
                <select id="" v-model="people.gender">
                  <option value="">Please select one</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <label for="date">DOB</label>
                <input type="date" v-model="people.date_of_birth" />

                <label for="com_d">Company</label>
                <select id="" v-model="people.com_id">
                  <option value="">Please select one</option>
                  <option
                    v-for="company in companys"
                    :key="company.company_id"
                    :value="company.company_id"
                  >
                    {{ company.company_name }}
                  </option>
                </select>

                <label for="position">Position</label>
                <select id="" v-model="people.position">
                  <option value="">Please select one</option>
                  <option value="Manager">Manager</option>
                  <option value="General Manager">General Manager</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                </select>

                <label for="account_status">Account Status</label>
                <select name="" v-model="people.account_status">
                  <option value="">Please select one</option>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>
                </select>

                <label for="name">Password</label>
                <input
                  type="password"
                  v-model="people.password"
                  name="password"
                  placeholder="Password"
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
  name: "createPeople",
  data() {
    return {
      alert_status: "",
      error_msg: "",
      companys: [],
      people: {
        name: "",
        email: "",
        gender: "",
        date_of_birth: "",
        com_id: "",
        position: "",
        account_status: "",
        password: "",
      },
    };
  },
  methods: {
    async createBtn() {
      // console.warn(this.people);
      if (this.people.name == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Name field is required!";
      } else if (this.people.email == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Email field is required!";
      } else if (this.people.gender == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Gender field is required!";
      } else if (this.people.date_of_birth == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "DOB field is required!";
      } else if (this.people.com_id == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Company field is required!";
      } else if (this.people.position == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Position field is required!";
      } else if (this.people.account_status == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Account Status field is required!";
      } else if (this.people.password == "") {
        this.alert_status = "alert-danger";
        this.error_msg = "Password field is required!";
      } else {
        //

        const result = await axios.post(
          "http://localhost/iubenda_backend/api/admin/people/create.php",
          {
            name: this.people.name,
            email: this.people.email,
            gender: this.people.gender,
            date_of_birth: this.people.date_of_birth,
            com_id: this.people.com_id,
            position: this.people.position,
            account_status: this.people.account_status,
            password: this.people.password,
          }
        );
        if (result.data.message == "success" && result.status == 200) {
          this.alert_status = "alert-success";
          this.error_msg = result.data.message;
          this.people.name = "";
          this.people.email = "";
          this.people.gender = "";
          this.people.date_of_birth = "";
          this.people.com_id = "";
          this.people.position = "";
          this.people.account_status = "";
          this.people.password = "";
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
    async loadData() {
      let tokens = localStorage.getItem("tokens");
      if (tokens == null) {
        this.$router.push({ name: "LogIn" });
      }

      const result = await axios.get(
        "http://localhost/iubenda_backend/api/admin/company/list.php"
      );
      this.companys = result.data.data;
      //console.log(result.data.data);
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
