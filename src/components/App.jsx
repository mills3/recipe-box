import React, {Component} from 'react';

import Button from './Button';
import SavedRecipes from './SavedRecipes';
import AddRecipeModal from './AddRecipeModal';
import ShowRecipeModal from './ShowRecipeModal';
import EditRecipeModal from './EditRecipeModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentName: '',
      currentIng: '',
      addingRecipe: false,
      showingRecipe: false,
      editingRecipe: false,
      newRecipeName: '',
      newRecipeIng: '',
      recipeNum: 0,
      missingInfo: false
    }
  }

  componentDidMount() {
    if(localStorage && localStorage.getItem('recipes')) {
      let lsArray = JSON.parse(localStorage.getItem('recipes'));
      this.setState({recipes: lsArray});
    }
  }

  toggleAddModal = () => {
    const {addingRecipe, editingRecipe, showingRecipe} = this.state;
    if(!editingRecipe && !showingRecipe) {
      this.setState({
        addingRecipe: !addingRecipe,
        missingInfo: false,
        newRecipeName: '',
        newRecipeIng: ''
      })
    }
  }

  getName = (e) => {
    this.setState({newRecipeName: e.target.value, missingInfo: false})
  }

  getIngredients = (e) => {
    this.setState({newRecipeIng: e.target.value, missingInfo: false})
  }

  addNewRecipe = () => {
    const {recipes, newRecipeName, newRecipeIng} = this.state;
    if(!newRecipeName || !newRecipeIng) {
      this.setState({missingInfo: true})
    }

    if(newRecipeName && newRecipeIng) {
      let newRecipe = {
        name: newRecipeName,
        ing: newRecipeIng.split(',')
      }

      let recipeClone = recipes.slice().concat(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(recipeClone));

      this.setState({
        recipes: recipeClone,
        newRecipeName: '',
        newRecipeIng: '',
        addingRecipe: false,
        missingInfo: false
      })
    }
  }

  toggleShowModal = (index) => {
    const {recipes, showingRecipe, addingRecipe, editingRecipe} = this.state;

    if(showingRecipe) {
      this.setState({showingRecipe: !showingRecipe})
    } else if(!editingRecipe && !addingRecipe) {
      this.setState({
        showingRecipe: !showingRecipe,
        currentName: recipes[index].name,
        currentIng: recipes[index].ing,
        recipeNum: index
      })
    }
  }

  toggleEditModal = () => {
    const {editingRecipe} = this.state;
    this.setState({
      editingRecipe: !editingRecipe,
      showingRecipe: false,
    })
  }

  deleteRecipe = () => {
    const {recipes, recipeNum} = this.state;
    let recipeClone = recipes.slice();
    recipeClone.splice(recipeNum, 1);
    localStorage.setItem('recipes', JSON.stringify(recipeClone));
    this.setState({
      recipes: recipeClone,
      showingRecipe: false
    })
  }

  getUpdatedName = (e) => {
    this.setState({currentName: e.target.value})
  }

  getUpdatedIng = (e) => {
    this.setState({currentIng: e.target.value.split(',')})
  }

  updateRecipe = () => {
    const {recipes, recipeNum, currentName, currentIng} = this.state;
    let clone = recipes.slice();

    let updated = {
      name: currentName,
      ing: currentIng
    }

    clone.splice(recipeNum, 1, updated);
    localStorage.setItem('recipes', JSON.stringify(clone));

    this.setState({
      recipes: clone,
      editingRecipe: false,
    })
  }

  render() {
    return (
      <div className="app">
        <div className="bgImage"></div>
        <header>
          <p>Recipe Box</p>
          <Button name="Add" handleClick={this.toggleAddModal} />
        </header>
        <SavedRecipes handleClick={this.toggleShowModal}
                      data={this.state.recipes}/>
        <AddRecipeModal toggle={this.state.addingRecipe}
                        cancelClick={this.toggleAddModal}
                        confirmClick={this.addNewRecipe}
                        getName={this.getName}
                        getIng={this.getIngredients}
                        clearIng={this.state.newRecipeIng}
                        clearName={this.state.newRecipeName}
                        missingInfo={this.state.missingInfo}/>
        <ShowRecipeModal toggle={this.state.showingRecipe}
                         currentName={this.state.currentName}
                         currentIng={this.state.currentIng}
                         editClick={this.toggleEditModal}
                         deleteClick={this.deleteRecipe}
                         closeClick={this.toggleShowModal}/>
        <EditRecipeModal toggle={this.state.editingRecipe}
                         cancelClick={this.toggleEditModal}
                         currentName={this.state.currentName}
                         currentIng={this.state.currentIng}
                         getUpdatedName={this.getUpdatedName}
                         getUpdatedIng={this.getUpdatedIng}
                         confirmEdit={this.updateRecipe}/>
      </div>
    );
  }
}

export default App;
