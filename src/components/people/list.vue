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
          <router-link to="/create-people"
            ><span class="fa fa-user"></span>
            <span>Create People</span></router-link
          >
        </li>
        <li>
          <router-link to="/people-list" class="active"
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

        people List
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
              <input type="text" placeholder="Search" v-model="search" />
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Name</td>
                      <td>Position</td>
                      <td>Tasks</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in filterData" :key="user.people_id">
                      <td>{{ user.row_id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.position }}</td>
                      <td>{{ user.tasks }}</td>
                      <td>
                        <router-link
                          :to="'/update-people/' + user.people_id"
                          style="color: aqua; text-decoration: none"
                          ><span class="fa fa-pen"></span></router-link
                        ><br /><br />
                        <span
                          v-on:click="deletePeopleBtn(user.people_id)"
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
  name: "peopleList",
  data() {
    return {
      search: "",
      people: [],
    };
  },
  methods: {
    async deletePeopleBtn(id) {
      if (confirm("Are you sure ?")) {
        const result = await axios.post(
          "http://localhost/iubenda_backend/api/admin/people/delete.php",
          {
            people_id: id,
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
        "http://localhost/iubenda_backend/api/admin/people/list.php"
      );
      this.people = result.data.data;
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
  computed: {
    filterData() {
      return this.people.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style>
@import "../../assets/css/style.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
</style>
