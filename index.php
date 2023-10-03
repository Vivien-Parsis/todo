<!DOCTYPE html>
<html lang="fr" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>todo list</title>
        <link rel="stylesheet" href="assets/css/todo.css" type="text/css">
        <link rel="icon" href="icon.ico">
        <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/mask@3.x.x/dist/cdn.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>
        <script defer src="https://unpkg.com/alpinejs"></script>
        <script src="todo.js"></script>
    </head>
    <body>
        <?php require_once("../component/nav.php");?>
        <header>
            <div x-data="darkmod">
                <button class="darktoggle" @click="darktoggle()">
                    <img :src="dark ? 'assets/image/light_mod.png' : 'assets/image/dark_mod.png'">
                </button>
                <link x-ref="darkmod_css" rel="stylesheet" :href="dark ? 'assets/css/dark.css' : ''" type="text/css" id="darkmodcss">  
            </div>
            <h1>To-Do List</h1>
        </header>
        <div x-data="tab">
            <div class="tab">
                <template x-for="i in tab">
                    <input type="button" @click="switchTab(i)" :class="i==currentTab ? 'activeTab' : ''" :value="i">
                </template>
                <input type="text" placeholder="inserez nom de l'onglet..." x-ref="nameTab" @keyup.enter="addTab()">
                <input type="button" value="ajouter un tab" @click="addTab()">
            </div>
            <template x-data x-for="j in tab">
                <div x-data="todo(j)" x-effect="watchItem()" x-show="currentTab==j" class="todo">
                    <input type="text" value="" placeholder="nouveau nom d'onglet" x-ref="newTab" @keyup.enter="modifyTab(j)" class="modifyTab">
                    <input type="button" value="modifié" @click="modifyTab(j)">
                    <input type="button" value="supprimer le tab courant" @click="removeTab(j)" class="removeTab">
                    <br>
                    <input type="text" x-model="search" placeholder="search..." class="search">
                    <div class="list">
                        <template x-for="contents in filtredItems" :key="contents.id">
                            <span class="todo_object">
                                <input type="button" value="↑" @click="up(contents.id)" x-show="getArrayIndex(contents.id)!=0" class="upButton">
                                <input type="button" value="↓" @click="down(contents.id)" x-show="getArrayIndex(contents.id)!=content.length-1" class="downButton">
                                <input type="checkbox" x-model="contents.check">
                                <span :class="alertDate(contents.echeance) && !contents.check ? 'missingdate' : 'date'" x-text="contents.echeance"></span>
                                <img src="assets/image/alert.png" x-show="alertDate(contents.echeance) && !contents.check" class="alert_img">
                                <span x-html="contents.objectif" :class="contents.check ? 'complete' : 'undone'" class="todo_objectif"></span>
                                <div class="modify" x-data="modify">
                                    <input type="button" value="Supprimer" @click="removeitem(`${contents.id}`)">
                                    <input type="button" value="modifier" @click="showmodify=!showmodify">
                                    <div x-show="showmodify" x-trap.inert.noscroll="showmodify" class="modify_input">
                                        <textarea cols="40" rows="1" class="textarea_objectif" x-model="newvalue_objectif" placeholder="inserez un nouveau objectif ici..."></textarea>   
                                        <input type="text" x-model="newvalue_echeance" x-mask="99/99/9999" placeholder="JJ/MM/AAAA">
                                        <input type="button" value="envoyer" @click="modify(contents)">
                                    </div>
                                </div>
                            </span>
                        </template>
                    </div>
                    <div class="add_item">
                        <label>ajouter un objectif : </label>
                        <textarea x-ref="objectif" class="textarea_objectif" cols="50" rows="2" placeholder="inserez un nouveau objectif ici..."></textarea>
                        <input type="text" x-ref="echeance" value="" x-mask="99/99/9999" placeholder="JJ/MM/AAAA">
                        <input type="button" @click="addItems()" class="button_add" value="envoyer">
                    </div>
                    <span x-ref="allDone" :class="content.length==0 ? 'allDone missing' : allDone ? 'allDone success' : 'allDone missing'"></span></span>
                    <br>
                    <input type="button" @click="clearStorage()" class="button" value="effacer tout">
                    <input type="button" @click="defaultStorage()" value="todo list par défaut" class="button">
                </div>
            </template>
        </div>
        <?php require_once('../component/footer.php')?>
    </body>
</html>