<template>
  <div id="app">
    <Nav></Nav>
    <router-view class="container" @registerUser="register" @updateuser="update" @addMatch="addMatch"></router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav
  },
  data() {
    return {
      users: [
        { name: "Petar", surname: "Petrovic", address: "Vuka Karadzica 12, Beograd", phone: "0612345542", username: "pera", password: "pera123", type: "student", },
        { name: "Zivojin", surname: "Zivojinovic", address: "Jovana Jovanovica 45, Beograd", phone: "06123454444", username: "zika", password: "zika123", type: "student", },
        { name: "Miroslav", surname: "Mirosavljevic", address: "Nadezde Petrovic 199, Beograd", phone: "06566664542", username: "mika", password: "mika123", type: "organizer", }
      ],
      matches: [
        { id: 1, username: "pera", venue: "Hala Pionir", date: "2020-01-20", time: "12:00" },
        { id: 2, username: "zika", venue: "Hala Pionir", date: "2020-01-20", time: "12:00" },
        { id: 3, username: "pera", venue: "Hala Pionir2", date: "2020-01-20", time: "12:00" },
      ],
      blogs: [
        { id: 1, title: "Kalemegdan Fortress", image: "Kalemegdan", numImages: 7, short: "The number one attraction in Belgrade is less a single sight and more a big conglomerate of everything that makes the city great...", desc: "The number one attraction in Belgrade is less a single sight and more a big conglomerate of everything that makes the city great. Kalemegdan Fortress has seen its fair share of conflict over the centuries, but the only violence you’ll see here in the 21st century will involve dogs fighting over a tennis ball. Essentially a huge park, the fortress looks out over the confluence of the Sava and Danube Rivers for what is undoubtedly the city’s most romantic spot." },
        { id: 2, title: "Church of Saint Sava", image: "SvetiSava", numImages: 7, short: "One of the largest Orthodox churches on the planet, the Church of Saint Sava is one of the most identifiable attractions in the entire region...", desc: "One of the largest Orthodox churches on the planet, the Church of Saint Sava is one of the most identifiable attractions in the entire region. It dominates the city’s skyline, and at 79 metres in height, it is easy to see why. The church was built on the spot where the Ottomans burned Saint Sava’s remains in 1595, but nearly 400 years passed before the church itself was completed. The interior is still under construction, but its unfinished state adds another layer of intrigue to this monumental house of worship." },
        { id: 3, title: "Knez Mihailova Street", image: "KnezMihajlova", numImages: 6, short: "While it isn’t the geographical centre of the city, Knez Mihailova is without doubt the social midpoint of the Serbian capital...", desc: "While it isn’t the geographical centre of the city, Knez Mihailova is without doubt the social midpoint of the Serbian capital. This long thoroughfare is where all strands of Belgrade society come to be seen, whether that is businessmen making deals in cafes or young people running aimlessly up and down it. This is the best spot for a little bit of people watching, and entire afternoons can be spent on Knez Mihailova, watching the day idly go by." },
        { id: 4, title: "Skadarlija", image: "Skadarlija", numImages: 5, short: "It is known as Belgrade’s Bohemian Quarter, but the use of the word ‘quarter’ is somewhat liberal...", desc: "It is known as Belgrade’s Bohemian Quarter, but the use of the word ‘quarter’ is somewhat liberal. Skadarlija is more a street than an entire area, but that street is full of restaurants, bars and cafes, all dotted along the cobblestones that are a delight to look at in the morning and a struggle to walk on when inebriated. Once the domain of poets, academics and drunks, Skadarlija now has both eyes focused firmly on the tourism sector. With that in mind, some of the best restaurants in the city can be found on this short stretch of street." },
        { id: 5, title: "Nikola Tesla Museum", image: "NikolaTesla", numImages: 6, short: "Nikola Tesla probably takes home the award of being the most popular modern Serb, and the inventor’s incredible life is honoured in an excellent city centre museum...", desc: "Nikola Tesla probably takes home the award of being the most popular modern Serb, and the inventor’s incredible life is honoured in an excellent city centre museum. Located within a diplomatic neighbourhood in Vračar, the museum displays a number of the great man’s inventions along with many of his personal items. If you ever wanted to create light simply by holding a light bulb, this is the place to go." },
        { id: 6, title: "Avala Tower", image: "Avala", numImages: 7, short: "While not technically a part of Belgrade itself, Avala is a nearby mountain that overlooks the city like some sort of angry big brother, in the familial sense, as opposed to the Orwellian...", desc: "While not technically a part of Belgrade itself, Avala is a nearby mountain that overlooks the city like some sort of angry big brother, in the familial sense, as opposed to the Orwellian. It is easy to imagine the minds behind 1984’s main antagonist directing traffic from Avala Tower, however, a 205-metre tall spindle that was destroyed by NATO in 1999 before being rebuilt in 2009. This is the tallest tower in the Balkans, and it is arguably the number one attraction at Avala. The Monument to the Unknown Hero gives it a good run for its money, but the tower just about wins out." }
      ]
    };
  },
  methods: {
    register(userData) {
      var controls = userData.controls;
      var userType = userData.userType;
      var newUser = {
        name: controls.name.value,
        surname: controls.surname.value,
        address: controls.address.value,
        phone: controls.phone.value,
        username: controls.username.value,
        password: controls.password.value,
        type: userType
      }
      this.users.push(newUser);
    },
    update(newUser) {
      var index = this.users.findIndex(user => user.username === newUser.username);
      this.users[index] = newUser;
    },
    addMatch(userData) {
      var controls = userData.controls;
      var student = userData.student;
      var newMatch = {
        id: this.matches.length + 1,
        username: student.value,
        venue: controls.venue.value,
        date: controls.date.value,
        time: controls.time.value
      }
      console.log("Add match")
      console.log(newMatch);
      this.matches.push(newMatch);
    },
  }
};
</script>

<style lang="scss">
</style>
