import { useEffect, useState } from 'react'
import './GroupRole.scss'
import { fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'
import { fetchAllRoles } from '../../services/roleService'
import { fetchRolesByGroup } from '../../services/roleService'
import _ from 'lodash'

const GroupRole = () => {

    const [userGroups, setUserGroups] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [listRoles, setListRoles] = useState([])

    const defaultAssignRolesByGroup = []
    const [assignRolesByGroup, setAssignRolesByGroup] = useState(defaultAssignRolesByGroup)

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let obj = {}
                obj.url = role.url
                obj.id = role.id
                obj.description = role.description
                obj.isAssigned = false
                if (groupRoles && groupRoles.length > 0) {
                    obj.isAssigned = groupRoles.some(item => item.url === obj.url)
                }

                result.push(obj)
            })
        }
        return result
    }

    const fetchGroupUser = async () => {
        let res = await fetchGroup()
        if (res && res.EC === 0) {
            setUserGroups(res.DT)
        } else {
            toast.error(res.EM)
        }
    }

    const getAllRoles = async () => {
        let res = await fetchAllRoles()
        if (res && +res.EC === 0) {
            setListRoles(res.DT)
        }
    }

    const handleOnChangeGroup = async (groupId) => {
        setSelectGroup(groupId)
        if (groupId) {
            let res = await fetchRolesByGroup(groupId)
            console.log("check res role by group: ", res)
            if (res && +res.EC === 0) {
                let result = buildDataRolesByGroup(res.DT.Roles, listRoles)
                setAssignRolesByGroup(result)
            }
        }
    }

    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned
        }
        setAssignRolesByGroup(_assignRolesByGroup)
    }

    useEffect(() => {
        fetchGroupUser();
        getAllRoles();
    }, [])

    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='container mt-3'>
                    <h4>Group role:</h4>
                    <div className='assign-group-role'>
                        <div className="col-12 col-sm-6 form-group">
                            <label>  Select Group: (<span className="red">*</span>) :</label>
                            <select
                                className='form-select'
                                onChange={(event) => handleOnChangeGroup(event.target.value)}
                            >
                                <option value=''>Pls Select your group</option>

                                {userGroups.length > 0 && userGroups.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                    )
                                })
                                }
                            </select >
                        </div>
                        <hr />
                        {selectGroup &&
                            <div className='roles'>
                                <h5>Assign Roles:</h5>
                                {
                                    assignRolesByGroup && assignRolesByGroup.length > 0 && assignRolesByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={item.isAssigned}
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <div className='mt-3'>
                                    <button className='btn btn-outline-warning'>Save</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GroupRole