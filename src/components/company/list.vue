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
          <router-link to="/company-list" class="active"
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

        company List
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
              <h2>Record</h2>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Name</td>
                      <td>People</td>
                      <td>Tasks</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="company in companys" :key="company.company_id">
                      <td>{{ company.row_id }}</td>
                      <td>{{ company.company_name }}</td>
                      <td>{{ company.people }}</td>
                      <td>{{ company.tasks }}</td>
                      <td>
                        <router-link
                          :to="'/update-company/' + company.company_id"
                          style="color: aqua; text-decoration: none"
                          ><span class="fa fa-pen"></span></router-link
                        ><br /><br />
                        <span
                          v-on:click="deleteCompanyBtn(company.company_id)"
                          class="fa fa-trash"
                          style="color: red"
                        ></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  name: "companyList",
  data() {
    return {
      companys: [],
    };
  },
  methods: {
    async deleteCompanyBtn(id) {
      if (confirm("Are you sure ?")) {
        const result = await axios.post(
          "http://localhost/iubenda_backend/api/admin/company/delete.php",
          {
            company_id: id,
          }
        );

        if (result.data.message == "success" && result.status == 200) {
          this.loadData();
        }
      }
    },
    logOut() {
      localStorage.clear();
      this.$router.push({ name: "LogIn" });
    },
    async loadData() {
      const result = await axios.get(
        "http://localhost/iubenda_backend/api/admin/company/list.php"
      );
      this.companys = result.data.data;
      // console.warn(result.data.data);
    },
  },
  mounted() {
    let tokens = localStorage.getItem("tokens");
    if (tokens == null) {
      this.$router.push({ name: "LogIn" });
    } else {
      this.loadData();
    }
  },
};
</script>

<style>
@import "../../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
