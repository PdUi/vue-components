<template>
  <div class="searchbox">
    <span class="query">
      <template v-for="(term, index) in query.terms">
        <span class="labeled-icon" :key="term.term" :class="{ selected: term.isSelected }">
          <span @click="selectTerm(term)">{{term.term}}</span>
          <i class="delete icon" @click="removeTerm(index)"></i>
        </span>
        <span class="operator" :key="term.term" v-if="query.operators.length > index" @click="toggleOperator(index)">
          {{query.operators[index]}}
        </span>
      </template>
    </span>

    <div class="labeled-input">
      <input
          type="text"
          @keydown.tab="addTerm"
          @keydown.enter="addTerm"
          placeholder="Add Search Term..."
          autofocus
          v-model="newTerm" />
      <i class="plus icon" @click="addTerm"></i>
      <div class="results" v-show="typeaheadResults.length">
        <div class="item" v-for="result in typeaheadResults" @click="resultClicked(result)" :key="result">
          {{result}}
        </div>
      </div>
    </div>

    <span class="right" v-if="query.terms.length">
      <i class="remove icon" @click="clearTerms"></i>
      <i class="search icon" @click="search"></i>
    </span>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'searchbox',
  data () {
    return {
      query: {
        terms: [{term: 'blood'}, {term: 'darkness'}],
        operators: ['OR']
      },
      newTerm: '',
      typeaheadResults: ['foo', 'bar']
    };
  },
  methods: {
    removeTerm: function (termIndex) {
      this.query.terms.splice(termIndex, 1);

      if (this.query.terms.length === 1) {
        this.query.operators = [];
      } else if (termIndex <= this.query.operators.length) {
        this.query.operators.splice(termIndex - 1, 1);
      }
    },
    toggleOperator: function (operatorIndex) {
      switch (this.query.operators[operatorIndex]) {
        case 'AND':
          Vue.set(this.query.operators, operatorIndex, 'OR');
          break;
        case 'OR':
          Vue.set(this.query.operators, operatorIndex, 'AND');
          break;
      }
    },
    addTerm: function (event) {
      if (event.keyCode === 9 && this.newTerm) { // "Tab"
        event.preventDefault();
        this._addTerm();
      }

      if (event.keyCode === 13) { // "Enter"
        this._addTerm();
        this.search();
      }

      if (event.type === 'click' && event.srcElement.className === 'plus icon') {
        this._addTerm();
      }
    },
    _addTerm: function () {
      if (this.newTerm) {
        this.query.terms.push({ term: this.newTerm });
        this.newTerm = '';
      }
    },
    clearTerms: function () {
      this.query = { terms: [], operators: [] };
    },
    search: function () {
      this.$emit('search', this.query);
    },
    resultClicked: function (result) {
      this.$emit('typeahead.click', result);
    },
    selectTerm: function (term) {
      Vue.set(term, 'isSelected', !term.isSelected);
    }
  }
};
</script>

<style scoped>
  .searchbox,
  .query,
  .labeled-icon,
  .labeled-input {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .icon::after {
    background-color: #aaa;
    border-radius: .5rem;
    cursor: pointer;
    font-style: normal;
    padding: .15rem;
  }

  .operator {
    background-color: #ddd;
    border-radius: .5rem;
    cursor: pointer;
    padding: .25rem;
  }

  .results {
    border-radius: .25rem;
    border-style: solid;
    border-width: 1px;
    min-width: 15%;
    margin-top: .25rem;
    position: absolute;
    top: 100%;
  }

  .labeled-icon {
    border-radius: .5rem;
    padding: .25rem;
  }

  .labeled-input {
    flex-grow: 1;
    position: relative;
  }

  input {
    border: 0;
    min-width: 15%;
  }

  input:focus {
    outline: unset;
  }
</style>

<style>
  .searchbox .icon.delete::after,
  .searchbox .icon.remove::after {
    content: 'X';
  }

  .searchbox .icon.plus::after {
    content: '+';
  }

  .searchbox .icon.search::after {
    content: 'O~';
  }

  .results {
    border-color: #d4d4d5;
    box-shadow: 0 2px 4px 0 rgba(34, 36, 38, .12), 0 2px 1px 0 rgba(34, 36, 38, .15);
  }

  .labeled-icon {
    background-color: #ddd;
  }

  .labeled-icon.selected {
    background-color: #ccc;
  }
</style>
