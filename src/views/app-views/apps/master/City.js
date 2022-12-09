import React, { useState } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form, message } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'

// import { Form, Input, Checkbox } from 'antd';
import { useEffect } from 'react';
import { getCity, createCity, updateCity, deleteCity } from 'utils/api/city';
import { getCountry } from 'utils/api/country';
import { getState } from 'utils/api/state';
import { getDistrict } from 'utils/api/district';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const { Option } = Select

const City = () => {
    const [list, setList] = useState(ProductListData)
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [hsnList, setHsnList] = useState([])
    const [countryList, setCountryList] = useState([])
    const [districtListOgn, setDistrictListOgn] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [stateListOgn, setStateListOgn] = useState([])
    const [stateList, setStateList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [submitLoading, setSubmitLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState({
        open: false,
        id: '',
        name: ''
    })
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showEditModal = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        setSelectedId(row.id)
        form.setFieldsValue({
            name: row.name,
            short_code: row.short_code,
            state_code: row.state_code,
            country_id: row.Country_id,
            state_id: row.State_id,
            district_id: row.District_id
        })
        handleCountryChange(row.Country_id, true)
        handleStateChange(row.State_id, true)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setSelectedId("")
        form.resetFields();
        setSubmitLoading(false)
        setStateList([])
        setDistrictList([])
    };

    function handleEnter(event) {
        const form = event?.target?.form;
        console.log(event?.key, form?.elements, 'key===')
        const index = Array.prototype.indexOf.call(form, event.target);
        if (event.keyCode === 13) {
            if ((index + 1) < form.elements.length) {
                form.elements[index + 1]?.focus();
            }
            event.preventDefault();
        } else if (event.keyCode === 27) {
            if ((index - 1) > 0) {
                form.elements[index - 1]?.focus();
            }
            event.preventDefault();
        }
    }
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        try {
            const { name, country_id, district_id, state_id } = values
            setSubmitLoading(true)
            let response;
            if (isEdit && selectedId) {

                response = await updateCity(selectedId, name, district_id, state_id, country_id)
                if (response?.success === true) {
                    message.success(response.message)
                }
            } else {
                response = await createCity(name, district_id, state_id, country_id);
                if (response?.success === true) {
                    message.success(response.message)
                }
            }

            if (response?.success === false) {
                Object.keys(response.data).map(item => {
                    message.warning(response.data[item][0])
                })
                setSubmitLoading(false);
                return;
            }

            setSubmitLoading(false)
            init()
            setIsModalOpen(false);
            setIsEdit(false);
            setSelectedId("")
            form.resetFields();
        } catch (error) {
            message.error(message)
        }
    };

    const onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    async function init() {
        try {
            const response = await getCity();
            if (response.data?.length) {
                setHsnList(response.data)
                setIsModalOpen(false);
                setInitialLoading(false)
                // message.success(response.message)
            } else {
                setHsnList([])
            }
        } catch (error) {
            message.error(message)
        }

    }
    async function getCountryData() {
        const response = await getCountry();
        if (response.data?.length) {
            setCountryList(response.data)
            setIsModalOpen(false);
        } else {
            setHsnList([])
        }
        setInitialLoading(false)
    }
    async function getStatData() {
        setInitialLoading(true)
        const response = await getState();
        if (response.data?.length) {
            setStateListOgn(response.data)
            setIsModalOpen(false);
        } else {
            setHsnList([])
        }
        setInitialLoading(false)
    }
    async function getDistrictData() {
        const response = await getDistrict();
        if (response.data?.length) {
            setDistrictListOgn(response.data)
            setIsModalOpen(false);
        } else {
            setHsnList([])
        }

    }


    useEffect(() => {

        init()
        getCountryData()
        getStatData()
        getDistrictData()

    }, [])

    const dropdownMenu = row => (
        <Menu>
            <Menu.Item onClick={() => showEditModal(row)}>
                <Flex alignItems="center">
                    <EditOutlined />
                    <span className="ml-2">Edit</span>
                </Flex>
            </Menu.Item>
            <Menu.Item onClick={() => setOpenDeleteModal({ open: true, id: row.id, name: row.name })}>
                <Flex alignItems="center">
                    <DeleteOutlined />
                    <span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
                </Flex>
            </Menu.Item>
        </Menu>
    );


    const deleteRow = async (id) => {
        if (!id) return;
        setSubmitLoading(true)
        const response = await deleteCity(id)
        setSubmitLoading(false)
        if (response.success === true) {
            message.success(response.message)
            init()
        }
        setOpenDeleteModal({
            open: false,
            id: '',
            name: ''
        })
    }

    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },


        {
            title: 'Country Name',
            dataIndex: 'counter_name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.Country_name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'State Name',
            dataIndex: 'State_Name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.State_Name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'District Name',
            dataIndex: 'District_Name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.District_Name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },

        {
            title: 'City Name',
            dataIndex: 'City_name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.name}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },


        {
            title: 'Created Date',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    {/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
                    {/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
                    {record.created_at}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },
        {
            title: 'Updated Date',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    {record.updated_at}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
        },

        {
            title: 'Action',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right">
                    <EllipsisDropdown menu={dropdownMenu(elm)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (key, rows) => {
            setSelectedRows(rows)
            setSelectedRowKeys(key)
        }
    };

    const onSearch = e => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value ? list : ProductListData
        const data = utils.wildCardSearch(searchArray, value)
        setList(data)
        setSelectedRowKeys([])
    }

    const handleShowCategory = value => {
        if (value !== 'All') {
            const key = 'category'
            const data = utils.filterArray(ProductListData, key, value)
            setList(data)
        } else {
            setList(ProductListData)
        }
    }

    const handleCountryChange = (val, isEdit) => {
        setStateList(stateListOgn.filter(ele => ele.Country_id == val))
        if (!isEdit) {
            form.setFieldValue('state_id', '')
            form.setFieldValue('district_id', '')
        }
    }
    const handleStateChange = (val, isEdit) => {
        setDistrictList(districtListOgn.filter(ele => ele.State_id == val))
        if (!isEdit) {
            form.setFieldValue('district_id', '')
        }
    }

    return (
        <>
            <Card>
                <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                    <Flex className="mb-1" mobileFlex={false}>
                        <div className="mr-md-3 mb-3">
                            <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
                        </div>
                        {/* <div className="mb-3">
							<Select
								defaultValue="All"
								className="w-100"
								style={{ minWidth: 180 }}
								onChange={handleShowCategory}
								placeholder="Category"
							>
								<Option value="All">All</Option>
								{
									categories.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select>
						</div> */}
                    </Flex>
                    <div>
                        <Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />} block>Add City</Button>
                    </div>
                </Flex>
                <div className="table-responsive">
                    <Table
                        columns={tableColumns}
                        dataSource={hsnList}
                        rowKey='id'
                        rowSelection={{
                            selectedRowKeys: selectedRowKeys,
                            type: 'checkbox',
                            preserveSelectedRowKeys: false,
                            ...rowSelection,
                        }}
                        loading={initialLoading}
                    />
                </div>
            </Card>

            <Modal

                title={isEdit ? "Edit City" : "Add City"} open={isModalOpen} onCancel={handleCancel} footer={[
                    // <Button type="primary" htmlType="submit"  onClick={onFinish}>
                    // 	Submit
                    // </Button>,
                    // <Button type="primary" onClick={handleCancel}	>
                    // 			Cancel
                    // 		</Button>
                ]}>
                <Form
                    form={form}
                    style={{ width: '85%' }}
                    // style={{boxShadow: '2px 5px 15px -10px rgb(0,0,0,0.5)',  padding:'10px', width:'50%'}}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        onKeyDown={handleEnter}
                        label="City Name"
                        name="name"
                        rules={[{ required: true, message: 'City Name field is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item onKeyDown={handleEnter} name="country_id" label="Country" rules={[{ required: true, message: 'Country  select is required' }]} >
                        <Select className="w-100" placeholder="Select Country" onChange={(val) => handleCountryChange(val, false)}>
                            {
                                countryList?.length > 0 ?
                                    countryList.map((elm) => {
                                        return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                    })
                                    :
                                    "No Data"
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item onKeyDown={handleEnter} name="state_id" label="State" rules={[{ required: true, message: 'State  select is required' }]} >
                        <Select className="w-100" placeholder="Select State" onChange={(val) => handleStateChange(val, false)}>
                            {
                                stateList?.length > 0 ?
                                    stateList.map((elm) => {

                                        return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                    })
                                    :
                                    "No Data"
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item onKeyDown={handleEnter} name="district_id" label="District" rules={[{ required: true, message: 'District  select is required' }]} >
                        <Select className="w-100" placeholder="Select District">
                            {
                                districtList?.length > 0 ?
                                    districtList.map((elm) => {
                                        return <Option key={elm.id} value={elm.id}>{elm.name}</Option>
                                    })
                                    :
                                    "No Data"
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}  >

                        <div style={{
                            width: '82%',
                            marginLeft: "50px"
                        }}>
                            <Button type="primary" htmlType="submit" loading={submitLoading}>
                                {isEdit ? "Save" : "Submit"}
                            </Button>
                            <Button type="primary" onClick={handleCancel} style={{ marginLeft: '20px' }}	>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Delete confirmation popup */}
            <Modal
                title={"Delete City"}
                open={openDeleteModal.open}
                onCancel={() => setOpenDeleteModal({
                    open: false,
                    id: '',
                    name: ''
                })}
                footer={[
                    <Button
                        type="primary"
                        loading={submitLoading}
                        htmlType="submit"
                        onClick={() => deleteRow(openDeleteModal.id)}
                    >
                        Delete
                    </Button>,
                    <Button type="primary" onClick={() => setOpenDeleteModal({
                        open: false,
                        id: '',
                        name: ''
                    })}
                    >
                        Cancel
                    </Button>
                ]}
            >
                <div>
                    <h2>{`Are you sure you want to delete ${openDeleteModal.name} City?`}</h2>
                </div>
            </Modal>
        </>
    )
}

export default City
