<template>
  <div class="container">
    <div>
      <div class="ui container title">
        <h3>
          Statistics
        </h3>
      </div>
      <div
        v-if="status.isFetchingCases || status.isFetchingCountries"
        class="ui grid centered stackable container"
      >
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div
        v-if="!status.isFetchingCases && !status.isFetchingCountries"
        class="ui grid centered stackable container fadeIn"
      >
        <div class="ui container title sub">
          <h3>World</h3>
          <span>Last updated: {{ cases.updated }}</span>
        </div>
        <div class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">{{ cases.cases }}</div>
              <div class="meta">
                <span><div class="circle red small"></div></span>
                <a>Total Cases</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">{{ cases.deaths }}</div>
              <div class="meta">
                <span><div class="circle black small"></div></span>
                <a>Total Deaths</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">{{ cases.recovered }}</div>
              <div class="meta">
                <span><div class="circle green small"></div></span>
                <a>Total Recovered</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">{{ cases.affectedCountries }}</div>
              <div class="meta">
                <a>Affected Countries</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="ui container title sub">
          <h3>Cases Rank</h3>
          <span>Last updated: {{ cases.updated }}</span>
          <div class="countries">
            <span
              v-for="(c, i) in countries.slice(0, 15)"
              :key="i"
              class="ui label"
            >
              #{{ i + 1 }}
              <nuxt-link :to="getURL(c.countryInfo.iso2)" class="detail">{{
                c.country
              }}</nuxt-link>
            </span>
          </div>
        </div>
        <div class="sixteen wide column">
          <autocomplete
            :search="search"
            :get-result-value="getResultValue"
            placeholder="Search for a country"
            aria-label="Search for a country"
            class="search"
            @submit="handleSubmit"
          >
            <template #result="{ result, props }">
              <nuxt-link
                v-if="result.countryInfo.iso2 != null"
                :to="getURL(result.countryInfo.iso2)"
                v-bind="props"
                class="autocomplete-result"
              >
                <i
                  :class="
                    result.countryInfo.iso2 != null
                      ? result.countryInfo.iso2.toLowerCase()
                      : ''
                  "
                  class="flag"
                ></i>
                {{ result.country }}
              </nuxt-link>
            </template>
          </autocomplete>
        </div>
      </div>
      <div
        v-if="incorrectCountry"
        class="ui grid centered stackable container notFound"
      >
        Country not found or doesn't have any historical data
      </div>
      <div
        v-if="
          (status.isFetchingCountryCases || status.isFetchingTimeline) &&
            country !== undefined &&
            !incorrectCountry
        "
        class="ui grid centered stackable container"
      >
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div
        v-if="!status.isFetchingCountryCases && !status.isFetchingTimeline"
        class="ui grid centered stackable container fadeIn"
      >
        <div
          v-if="country !== undefined"
          class="ui container title sub countries"
          :class="country !== undefined ? 'pushed' : ''"
        >
          <h3 class="uppercase">
            <i :class="country.toLowerCase()" class="flag"></i>
            #{{ countryRank }} {{ countryCases.country }}
          </h3>
          <span>Last updated: {{ cases.updated }}</span>
          <nuxt-link
            data-content="Close"
            data-position="top right"
            to="/statistics"
            class="right"
          >
            <i class="remove icon"></i>
          </nuxt-link>
          <a
            data-content="Clear Cache"
            data-position="top right"
            class="right"
            @click="clearCache()"
          >
            <i class="sync alternate icon"></i>
          </a>
        </div>
        <div v-if="country !== undefined" class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">
                {{ countryCases.cases.toLocaleString() }}
                <span
                  >+{{
                    Math.abs(
                      countryCases.cases -
                        countryTimeline.values.cases.slice(-1)[0]
                    )
                  }}</span
                >
              </div>
              <div class="meta">
                <span><div class="circle red small"></div></span>
                <a>Total Cases</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div v-if="country !== undefined" class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">
                {{ countryCases.deaths.toLocaleString() }}
                <span
                  >+{{
                    Math.abs(
                      countryTimeline.values.deaths.slice(-1)[0] -
                        countryCases.deaths
                    )
                  }}</span
                >
              </div>
              <div class="meta">
                <span><div class="circle black small"></div></span>
                <a>Total Deaths</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div v-if="country !== undefined" class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">
                {{ countryCases.recovered.toLocaleString() }}
                <span
                  >+{{
                    Math.abs(
                      countryTimeline.values.recovered.slice(-1)[0] -
                        countryCases.recovered
                    )
                  }}</span
                >
              </div>
              <div class="meta">
                <span><div class="circle green small"></div></span>
                <a>Total Recovered</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div v-if="country !== undefined" class="four wide column">
          <div class="ui card">
            <div class="content">
              <div class="header">{{ countryCases.percentageToWorld }}%</div>
              <div class="meta">
                <a>Of the World cases</a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        <div v-if="country !== undefined" class="sixteen wide column chart">
          <div class="chartTitle">
            <div class="red circle small"></div>
            Cases
          </div>
          <span
            :class="showChartData ? 'dates' : ''"
            class="ui label"
            @click="showChartData = !showChartData"
            >Dates</span
          >
          <trend
            :data="countryTimeline.values.cases"
            :gradient="['#ff3b2c', '#ffca66', '#122108']"
            auto-draw
            smooth
          >
          </trend>
          <div v-if="!showChartData" class="labels">
            <span class="label">{{ countryCases.chartLabels.cases[0] }}</span>
            <span class="label">{{ countryCases.chartLabels.cases[1] }}</span>
            <span class="label">{{ countryCases.chartLabels.cases[2] }}</span>
          </div>
          <div v-if="showChartData" class="labels">
            <span class="label">{{ countryCases.chartLabels.cases[3] }}</span>
            <span class="label">{{ countryCases.chartLabels.cases[4] }}</span>
            <span class="label">{{ countryCases.cases.toLocaleString() }}</span>
          </div>
        </div>
        <div v-if="country !== undefined" class="sixteen wide column chart">
          <div class="chartTitle">
            <div class="black circle small"></div>
            Death
          </div>
          <span
            :class="showChartData ? 'dates' : ''"
            class="ui label"
            @click="showChartData = !showChartData"
            >Dates</span
          >
          <trend
            :data="countryTimeline.values.deaths"
            :gradient="['#191919', '#122108', '#ffca66']"
            auto-draw
            smooth
          >
          </trend>
          <div v-if="!showChartData" class="labels">
            <span class="label">{{ countryCases.chartLabels.deaths[0] }}</span>
            <span class="label">{{ countryCases.chartLabels.deaths[1] }}</span>
            <span class="label">{{ countryCases.chartLabels.deaths[2] }}</span>
          </div>
          <div v-if="showChartData" class="labels">
            <span class="label">{{ countryCases.chartLabels.deaths[3] }}</span>
            <span class="label">{{ countryCases.chartLabels.deaths[4] }}</span>
            <span class="label">{{
              countryCases.deaths.toLocaleString()
            }}</span>
          </div>
        </div>
        <div v-if="country !== undefined" class="sixteen wide column chart">
          <div class="chartTitle">
            <div class="green circle small"></div>
            Recovered
          </div>
          <span
            :class="showChartData ? 'dates' : ''"
            class="ui label"
            @click="showChartData = !showChartData"
            >Dates</span
          >
          <trend
            :data="countryTimeline.values.recovered"
            :gradient="['#42b983', '#5daf82', '#2c3e50']"
            auto-draw
            smooth
          >
          </trend>
          <div v-if="!showChartData" class="labels">
            <span class="label">{{
              countryCases.chartLabels.recovered[0]
            }}</span>
            <span class="label">{{
              countryCases.chartLabels.recovered[1]
            }}</span>
            <span class="label">{{
              countryCases.chartLabels.recovered[2]
            }}</span>
          </div>
          <div v-if="showChartData" class="labels">
            <span class="label">{{
              countryCases.chartLabels.recovered[3]
            }}</span>
            <span class="label">{{
              countryCases.chartLabels.recovered[4]
            }}</span>
            <span class="label">{{
              countryCases.recovered.toLocaleString()
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      country: this.$route.params.country,
      cases: {},
      countries: [],
      countryCases: {},
      countryTimeline: {
        values: { cases: [], deaths: [], recovered: [] },
        dates: { cases: [], deaths: [], recovered: [] }
      },
      filter: 'cases',
      showChartData: false,
      status: {
        isFetchingCases: true,
        isFetchingCountries: true,
        isFetchingTimeline: true,
        isFetchingCountryCases: true
      },
      incorrectCountry: false,
      countryRank: 0
    }
  },
  computed: {},
  created() {
    this.getCases()
    this.getCountries()
    if (this.country) {
      this.getTimeline(this.country)
    }
  },
  mounted() {
    window.$('.ui.dropdown').dropdown({
      clearable: false
    })
    setTimeout(() => {
      window.$('a.right').popup()
    }, 1000)
  },
  methods: {
    clearCache() {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName)
        })
        window.location.reload()
      })
    },
    removeDuplicates(array, arrayVal, f) {
      // eslint-disable-next-line no-var
      var d = []
      // eslint-disable-next-line no-var
      var v = []
      array.forEach(function(e, i) {
        delete array[i]
        if (!array.includes(e)) {
          d.push(e)
          v.push(arrayVal[i])
        }
      })
      this.countryTimeline.dates[f] = v
      this.countryTimeline.values[f] = d
    },
    genChartData() {
      const d = []
      this.countryTimeline.dates[this.filter].forEach((e, i) => {
        d.push({
          value: this.countryTimeline.values[this.filter][i],
          title: this.countryTimeline.dates[this.filter][i]
        })
      })
      return d
    },
    async getCountryCases(c) {
      const r = await this.$axios.$get(
        'https://disease.sh/v3/covid-19/countries/' + c
      )
      try {
        this.countryCases = r
        this.countryCases.percentageToWorld = parseFloat(
          (r.cases * 100) / this.cases.cases.split(',').join('')
        ).toFixed(3)
        this.countryCases.chartLabels = {}
        this.countryCases.chartLabels.cases = [
          this.formateDate(this.countryTimeline.dates.cases.slice(0)[0]),
          this.formateDate(
            this.countryTimeline.dates.cases[
              Math.floor((this.countryTimeline.dates.cases.length - 1) / 2)
            ]
          ),
          this.formateDate(this.countryTimeline.dates.cases.slice(-1)[0]),
          this.countryTimeline.values.cases.slice(0)[0].toLocaleString(),
          this.countryTimeline.values.cases[
            Math.floor((this.countryTimeline.dates.cases.length - 1) / 2)
          ].toLocaleString()
        ]
        this.countryCases.chartLabels.recovered = [
          this.formateDate(this.countryTimeline.dates.recovered.slice(0)[0]),
          this.formateDate(
            this.countryTimeline.dates.recovered[
              Math.floor((this.countryTimeline.dates.recovered.length - 1) / 2)
            ]
          ),
          this.formateDate(this.countryTimeline.dates.recovered.slice(-1)[0]),
          this.countryTimeline.values.recovered.slice(0)[0].toLocaleString(),
          this.countryTimeline.values.recovered[
            Math.floor((this.countryTimeline.dates.deaths.length - 1) / 2)
          ].toLocaleString()
        ]
        this.countryCases.chartLabels.deaths = [
          this.formateDate(this.countryTimeline.dates.deaths.slice(0)[0]),
          this.formateDate(
            this.countryTimeline.dates.deaths[
              Math.floor((this.countryTimeline.dates.deaths.length - 1) / 2)
            ]
          ),
          this.formateDate(this.countryTimeline.dates.deaths.slice(-1)[0]),
          this.countryTimeline.values.deaths.slice(0)[0].toLocaleString(),
          this.countryTimeline.values.deaths[
            Math.floor((this.countryTimeline.dates.deaths.length - 1) / 2)
          ].toLocaleString()
        ]
        setTimeout(() => {
          this.status.isFetchingCountryCases = false
          this.getRank()
        }, 100)
      } catch (error) {
        this.getCountryCases(this.country)
      }
    },
    getRank() {
      this.countries.forEach((e, i) => {
        if (
          e.countryInfo.iso2.toLowerCase() === this.country.toLowerCase() ||
          e.country.toLowerCase() === this.country.toLowerCase()
        ) {
          this.countryRank = i + 1
        }
      })
    },
    formateDate(d) {
      const t = new Date(d)
      return (
        t.getDate() +
        '/' +
        (parseInt(t.getMonth()) + 1) +
        '/' +
        t
          .getFullYear()
          .toString()
          .slice(2, 4)
      )
    },
    async getTimeline(c) {
      try {
        const r = await this.$axios.$get(
          'https://disease.sh/v3/covid-19/historical/' + c
        )

        this.countryTimeline.dates.cases = Object.keys(r.timeline.cases)
        this.countryTimeline.values.cases = Object.values(r.timeline.cases)
        this.countryTimeline.dates.deaths = Object.keys(r.timeline.deaths)
        this.countryTimeline.values.deaths = Object.values(r.timeline.deaths)
        this.countryTimeline.dates.recovered = Object.keys(r.timeline.recovered)
        this.countryTimeline.values.recovered = Object.values(
          r.timeline.recovered
        )
        this.removeDuplicates(
          this.countryTimeline.values.cases,
          this.countryTimeline.dates.cases,
          'cases'
        )
        this.getCountryCases(this.country)
        this.status.isFetchingTimeline = false
      } catch (error) {
        this.incorrectCountry = true
      }
    },
    getURL(i) {
      try {
        return '/statistics/' + i.toLowerCase()
      } catch (err) {
        console.log(err)
      }
    },
    async getCases() {
      const r = await this.$axios.$get('https://disease.sh/v3/covid-19/all')
      this.cases = r
      this.cases.cases = r.cases.toLocaleString()
      this.cases.deaths = r.deaths.toLocaleString()
      this.cases.recovered = r.recovered.toLocaleString()
      this.cases.updated = this.timeDifference(new Date(), new Date(r.updated))
      this.status.isFetchingCases = false
    },
    async getCountries() {
      const r = await this.$axios.$get('https://disease.sh/v3/covid-19/countries')
      r.forEach((e) => {
        if (e.countryInfo.iso2 != null) {
          this.countries.push(e)
        }
      })
      this.countries.sort((b, a) => {
        return a.cases - b.cases
      })
      this.status.isFetchingCountries = false
    },
    search(input) {
      if (input.length < 1) {
        return []
      }
      return this.countries.filter((c) => {
        return c.country.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getResultValue(result) {
      return result.country
    },
    handleSubmit(result) {
      if (result) {
        this.$router.push({
          path: '/statistics/' + result.country.toLowerCase()
        })
      }
    },
    timeDifference(current, previous) {
      const msPerMinute = 60 * 1000
      const msPerHour = msPerMinute * 60
      const msPerDay = msPerHour * 24
      const msPerMonth = msPerDay * 30
      const msPerYear = msPerDay * 365
      const elapsed = current - previous
      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago'
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago'
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago'
      } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago'
      } else if (elapsed < msPerYear) {
        return (
          'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
        )
      } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago'
      }
    }
  }
}
</script>
