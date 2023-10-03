document.addEventListener('alpine:init', () => {
    Alpine.data('darkmod', function(){ 
        return{
            dark : this.$persist(false).as('dark').using(sessionStorage),
            darktoggle(){
                this.dark=!this.dark;
            }
    }});
    Alpine.data('tab', function(){
        return{
            tab : this.$persist(['main']).as('tab'),
            currentTab : this.$persist('main').as('currentTab'),
            switchTab(tab){
                if(this.tab.includes(tab)){
                    this.currentTab=tab;
                }
            },
            addTab(){
                const inputvalue = this.$refs.nameTab.value.trim();
                if(inputvalue.length!=0){
                    !this.tab.includes(inputvalue) ? this.tab.push(inputvalue) : alert('this tab name is already use !');
                    this.switchTab(inputvalue);
                    this.$refs.nameTab.value="";
                }
            },
            removeTab(tabToDelete){
                window.localStorage.removeItem(`todo${tabToDelete}`);
                this.tab.splice(this.tab.indexOf(tabToDelete),1);
                this.switchTab(this.tab[0]);
            },
            modifyTab(tabToModify){
                if(this.$refs.newTab.value.trim()!=0){
                    for(let i = 0; i<this.tab.length;i++){
                        if(tabToModify==this.tab[i]){
                            this.tab[i]=this.$refs.newTab.value.trim();
                            this.switchTab(this.$refs.newTab.value.trim());
                            break;
                        }
                    }
                }
                this.$refs.newTab.value="";
            }
    }});
    Alpine.data('todo', function(tab){ 
        return {
            search : '',
            allDone : false, 
            content : this.$persist([
                {
                    id : 0,
                    check : false,
                    echeance : "12/02/2023",
                    objectif : "Aliquam erat volutpat. Nullam elit urna, sagittis ut leo ac, elementum efficitur libero. In metus sapien, accumsan nec fermentum tincidunt, mattis quis dolor. Mauris iaculis quam a metus tempor feugiat. Duis vitae lorem a nibh ultricies placerat. Morbi bibendum purus in sem pulvinar gravida. Etiam semper imperdiet ipsum, eu interdum lacus mattis molestie. Praesent sed gravida magna."
                },
                {   
                    id : 1,
                    check : false,
                    echeance : "26/11/2023",
                    objectif : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus eget odio et luctus. Suspendisse potenti. Etiam eros nulla, ultrices vel malesuada eget, volutpat suscipit nulla. Integer at ultricies leo, quis ultrices mi. Aliquam vitae maximus lorem, sit amet fringilla neque. Suspendisse magna ex, sagittis non aliquet ut, iaculis nec erat."
                },
                {   
                    id : 2,
                    check : true,
                    echeance : "02/11/2023",
                    objectif : "Sed ornare enim at elementum facilisis. Quisque placerat iaculis pellentesque. Praesent nunc lorem, ultricies hendrerit mauris et, egestas porttitor dui. Quisque venenatis rhoncus ex, vitae commodo leo placerat sed. Vestibulum et porttitor ligula, in facilisis lectus. Phasellus risus purus, imperdiet nec laoreet sit amet, accumsan vitae ex. Aliquam vitae maximus lorem, sit amet fringilla neque. "
                },
                {   
                    id : 3,
                    check : false,
                    echeance : "09/12/2023",
                    objectif : "Sed tortor enim, consectetur ac bibendum ac, congue et mauris. Sed consectetur augue dignissim dictum sagittis. Cras odio est, dictum sit amet feugiat non, ultrices eget neque. Pellentesque semper lacus et odio vehicula aliquam. Phasellus euismod tellus nunc, vel hendrerit eros condimentum non. Nulla aliquam, arcu sed tempus sollicitudin, sem massa interdum massa, ultricies volutpat dolor eros a urna. Vivamus tincidunt sit amet sem at condimentum. Sed rhoncus est tellus."  
                }])
                .as(`todo${tab}`),
            clearStorage(){
                this.content=[];
            },
            defaultStorage(){
                this.content=[
                    {
                        id : 0,
                        check : false,
                        echeance : "12/02/2023",
                        objectif : "Aliquam erat volutpat. Nullam elit urna, sagittis ut leo ac, elementum efficitur libero. In metus sapien, accumsan nec fermentum tincidunt, mattis quis dolor. Mauris iaculis quam a metus tempor feugiat. Duis vitae lorem a nibh ultricies placerat. Morbi bibendum purus in sem pulvinar gravida. Etiam semper imperdiet ipsum, eu interdum lacus mattis molestie. Praesent sed gravida magna."  
                    },
                    {   
                        id : 1,
                        check : false,
                        echeance : "26/11/2023",
                        objectif : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus eget odio et luctus. Suspendisse potenti. Etiam eros nulla, ultrices vel malesuada eget, volutpat suscipit nulla. Integer at ultricies leo, quis ultrices mi. Aliquam vitae maximus lorem, sit amet fringilla neque. Suspendisse magna ex, sagittis non aliquet ut, iaculis nec erat."  
                    },
                    {   
                        id : 2,
                        check : true,
                        echeance : "02/11/2023",
                        objectif : "Sed ornare enim at elementum facilisis. Quisque placerat iaculis pellentesque. Praesent nunc lorem, ultricies hendrerit mauris et, egestas porttitor dui. Quisque venenatis rhoncus ex, vitae commodo leo placerat sed. Vestibulum et porttitor ligula, in facilisis lectus. Phasellus risus purus, imperdiet nec laoreet sit amet, accumsan vitae ex. Aliquam vitae maximus lorem, sit amet fringilla neque. "   
                    },
                    {   
                        id : 3,
                        check : false,
                        echeance : "09/12/2023",
                        objectif : "Sed tortor enim, consectetur ac bibendum ac, congue et mauris. Sed consectetur augue dignissim dictum sagittis. Cras odio est, dictum sit amet feugiat non, ultrices eget neque. Pellentesque semper lacus et odio vehicula aliquam. Phasellus euismod tellus nunc, vel hendrerit eros condimentum non. Nulla aliquam, arcu sed tempus sollicitudin, sem massa interdum massa, ultricies volutpat dolor eros a urna. Vivamus tincidunt sit amet sem at condimentum. Sed rhoncus est tellus."  
                    }
            ]},
            filtredItems(){ 
                return this.content.filter((i)=>i.objectif.startsWith(this.search));
            },
            addItems(){
                let id = 0;
                this.content.forEach((value)=>{id==value['id'] ? id++ : id});
                if(this.$refs.objectif.value.length>0){
                    this.content= [...this.content,{id : id, check : false, echeance : this.$refs.echeance.value, objectif : this.$refs.objectif.value}];
                    this.$refs.objectif.value="";
                    this.$refs.echeance.value="";
                }
            },
            removeitem(id){
                for(let i = 0; i<this.content.length;i++){
                    if(this.content[i]["id"]==parseInt(id)){
                        this.content.splice(i,1);
                        return;
                    }
                }
            },
            modifyItem(id,newContent,newDate){
                for(let i = 0; i<this.content.length;i++){
                    if(this.content[i]["id"]==parseInt(id)){
                        this.content[i]["objectif"]=newContent;
                        this.content[i]["echeance"]=newDate;
                        newContent="";
                        newDate="";
                        return;
                    }
                }
            },
            watchItem(){
                this.allDone = true;
                for(let i = 0; i<this.content.length;i++){
                    if(!this.content[i].check){
                        this.allDone = false;
                        break;
                    }
                }
                this.$refs.allDone.innerHTML = this.content.length==0 ? 'veuillez rajouter des objectifs' : this.allDone ? 'tous completé' : 'certain(s) objectif(s) ne sont pas encore completé(s) !';
            },
            up(id){
                const currentindexByLenght = this.getArrayIndex(id);
                if(currentindexByLenght-1===-1){
                    return;
                }
                const upvalue = {
                    objectif : this.content[currentindexByLenght-1].objectif,
                    echeance : this.content[currentindexByLenght-1].echeance,
                    check : this.content[currentindexByLenght-1].check
                };
                
                this.content[currentindexByLenght-1].objectif=this.content[currentindexByLenght].objectif;
                this.content[currentindexByLenght-1].echeance=this.content[currentindexByLenght].echeance;
                this.content[currentindexByLenght-1].check=this.content[currentindexByLenght].check;
                
                this.content[currentindexByLenght].objectif=upvalue.objectif;
                this.content[currentindexByLenght].echeance=upvalue.echeance;
                this.content[currentindexByLenght].check=upvalue.check;
            },
            down(id){
                const currentindexByLenght = this.getArrayIndex(id);
                if(currentindexByLenght+1==this.content.length){
                    return;
                }
                const downvalue = {
                    objectif : this.content[currentindexByLenght+1].objectif,
                    echeance : this.content[currentindexByLenght+1].echeance,
                    check : this.content[currentindexByLenght+1].check
                };
                
                this.content[currentindexByLenght+1].objectif=this.content[currentindexByLenght].objectif;
                this.content[currentindexByLenght+1].echeance=this.content[currentindexByLenght].echeance;
                this.content[currentindexByLenght+1].check=this.content[currentindexByLenght].check;
                
                this.content[currentindexByLenght].objectif=downvalue.objectif;
                this.content[currentindexByLenght].echeance=downvalue.echeance;
                this.content[currentindexByLenght].check=downvalue.check;
            },
            getArrayIndex(id){
                return this.content.findIndex(value => value.id == id);
            },
            alertDate(date){
                let today = new Date().toLocaleDateString().split("/");
                for(let i = 0; i<today.length; i++){
                    today[i]=parseInt(today[i]);
                }
                let dateToArray = date.split("/");
                for(let i = 0; i<dateToArray.length; i++){
                    dateToArray[i]=parseInt(dateToArray[i]);
                }
                return (today[2]>dateToArray[2])||(today[1]>dateToArray[1]&&today[2]==dateToArray[2])||(today[0]>dateToArray[0]&&today[1]==dateToArray[1]&&today[2]==dateToArray[2]);
            }
    }});
    Alpine.data('modify', function(){ 
        return{
            showmodify : false, 
            newvalue_objectif : '',
            newvalue_echeance : '',
            modify(contents){
                if(this.newvalue_objectif=='' && this.newvalue_echeance==''){
                    return;
                }
                if(this.newvalue_objectif==''){
                    this.newvalue_objectif=this.contents.objectif;
                }
                if(this.newvalue_echeance==''){
                    this.newvalue_echeance=this.contents.echeance;
                }
                this.modifyItem(`${contents.id}`,this.newvalue_objectif,this.newvalue_echeance);
                this.showmodify=!this.showmodify;
                this.newvalue_objectif='';
                this.newvalue_echeance='';
            }
    }});
});