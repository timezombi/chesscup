import React from 'react';
import {render} from 'react-dom';
import ParticipantsListTable from "./ParticipantsListTable.jsx";
import ApplyButton from "../team/apply_button.jsx";

class TeamsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: this.props.teams,
            tournament: this.props.tournament,
            apliers: [],
        }
        this.selectTeam = this.selectTeam.bind(this);
        this.removeTeam = this.removeTeam.bind(this);
        this.removeParticipant = this.removeParticipant.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.setApplies = this.setApplies.bind(this);
        this.approvePlayer = this.approvePlayer.bind(this);
        this.setOnlineTeamOwner = this.setOnlineTeamOwner.bind(this);

    }
    componentDidMount(){
        const self = this;


        $("body").on("click", ".approve_player", function () {
            const user_id = $(this).attr("data-id");
            self.approvePlayer(user_id);
        });

        console.log(this.props);


    }
    approvePlayer(event){
        const self = this;

        var $target = $(event.target);
        var id = $target.data("id");

        if (id) {
            this.props.addParticipant(event);
        }


    }
    setOnlineTeamOwner(team_id){
        const self = this;

        //если владелец команды в онайлн турнире, то даем понять это родительскому классу, информация нужна для фиксации id команды
        //при одобрении игроков
        if (team_id) {
            this.props.setOnlineTeamOwner(team_id);
        }
    }
    changeOrder(event){
        var that = this;
        this.props.changeOrder(event);
    }
    setApplies(applies){
        const self = this;
        this.setState({
            apliers : applies
        });
    }

    selectTeam(event){
        var that = this;

        var $target = $(event.target);
        var id = $target.data("id");

        if (id) {
          //  $(".team-title").removeClass("bg-primary text-white").addClass("bg-light text-dark");
            this.props.setTeam(id);

         //   $target.addClass("bg-primary text-white").removeClass("bg-light text-dark");
         //   $target.find("[type='radio']").prop("checked", true);
        } else {
          //  $target.parent().click();
        }

    }
    removeParticipant(event){
        event.preventDefault();
        var that = this;

        var $target = $(event.target);
        var id = $target.data("id");

        if (id) {
            this.props.removeParticipant(event);
        }

    }
    removeTeam(event){
        var that = this;
        event.preventDefault();
        event.stopPropagation();

        if (confirm("Вы уверены?")){
            var $target = $(event.target);
            var id = $target.data("id");

            this.props.removeTeam(id);
        }




    }

    componentWillReceiveProps(nextProps){


      //  if(nextProps.value !== this.props.pairs){
            this.setState({
                teams:nextProps.teams,
            });
       // }


    }
    render() {
        var w5 = {
            width : "5%"
        };
        var w12 = {
            width : "12%"
        };
        var w30 = {
            width : "36.5%"
        };

        var selected = {
            style : "participant"
        };

        var selectedTeam = {
            style : ""
        };
        var cname = "customRadio";
console.log(this.state.teams);
        return (
            <div className={this.state.tournament.is_online === 0 ? "position-relative mt-0 row" : "position-relative mt-5 row"}>
                <div className="col-sm-9">
                {Object.keys(this.state.teams).map((item, index) => (
                    <div className={typeof u !== "undefined" && this.state.teams[item].applier_id == u ? "mt-1 applier alert alert-success" : "mt-1"} key={index}>
                        <div className={(this.props.current_team != null && (this.props.current_team == this.state.teams[item].team_id) ? "p-1 mb-2 d-flex justify-content-between team-title participant selected bg-primary text-white" : "p-1 mb-2 bg-light text-dark d-flex justify-content-between team-title participant ")} data-id={item} onClick={this.selectTeam}>
                            <div>
                               <b>{this.state.teams[item].team_id} {this.state.teams[item].name} </b>
                            </div>
                            {this.state.tournament.is_online === 1 ?
                            <span>
                                {(this.props.current_team == this.state.teams[item].team_id ? null : <span data-id={item} onClick={this.selectTeam} className="select-team-btn mr-3">{_ChooseTeam}</span>)}

                                <a href="" className="fa fa-trash trash-team text-dark mr-1 mt-1"  data-id={item} title="Удаление команды" onClick={this.removeTeam} ></a>
                            </span>
                                : <span data-id={item} onClick={this.selectTeam} className="select-team-btn mr-3">Показать заявки</span> }
                        </div>

                        {(typeof this.state.teams[item].users !== "undefined" && this.state.teams[item].users.length > 0) ?
                            <table className="table table-hover borderless table-sm" key={index}>
                                <thead>
                                <tr>
                                    <th>Доска</th>
                                    <th>Имя</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.teams[item].users.map((user, index1) => (
                                    <tr key={index1} className="first-row" data-id={this.state.teams[item].team_id} data-user-id={user.user_id}>
                                        <th scope="row">{index1 + 1}</th>
                                        <td>{user.name} {user.user_id} Доска : {user.team_board}</td>
                                        <td>
                                            {typeof u !== "undefined" && this.state.teams[item].applier_id == u ?
                                            <div>
                                                <span className="far fa-caret-square-up caret" data-action="up" data-team-id={this.state.teams[item].team_id} onClick={this.changeOrder} data-board={user.team_board} data-user-id={user.user_id}></span>
                                                <span className="far fa-caret-square-down caret ml-1" data-action="down" onClick={this.changeOrder} data-team-id={this.state.teams[item].team_id} data-board={user.team_board} data-user-id={user.user_id}></span>
                                                <a href="" className="fa fa-trash float-right" data-id={user.user_id} data-team-id={this.state.teams[item].team_id} title="Удаление участника" onClick={this.removeParticipant} data-team_id={this.state.teams[item].team_id}></a>
                                            </div>
                                                : null}

                                        </td>
                                        <td></td>
                                    </tr>))}
                                </tbody>
                            </table>
                         : null }

                    </div>

                ))}

                </div>
                <div className="col-sm-3">

                    <ApplyButton setApplies={this.setApplies} setOnlineTeamOwner={this.setOnlineTeamOwner}/>

                    <table className="table table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Заявки</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.apliers.map((user, index1) => (
                            <tr key={index1}>
                                <td>
                                    <div>{user.name}</div>

                                <i className="fa fa-check btn btn-success btn-sm approve_player"
                                   onClick={this.approvePlayer} data-rating={user.tournaments_rating} data-id={user.user_id} aria-hidden="true"></i>
                                <i className="fa fa-times btn btn-danger btn-sm decline_player" data-id={user.user_id}  aria-hidden="true"></i>
</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );

    }
}

export default TeamsList;

