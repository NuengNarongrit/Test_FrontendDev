import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, DatePicker, Select, Button, Radio, Checkbox, Table, Layout, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Store } from 'antd/lib/form/interface';
import type { ColumnsType, TableProps } from 'antd/es/table';

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right, #6eda78, #ffa200)',
};

interface DataType {
  key: React.Key;
  name: string;
  sex: string;
  tel: string;
  nationnal: string;
  selected?: boolean; // เพิ่มคุณสมบัติ selected
}

const columns: ColumnsType<DataType> = [
  {
    title: (<Checkbox />),
    dataIndex: 'selected',
  },
  {
    title: 'ชื่อ',
    dataIndex: 'name',
  },
  {
    title: 'เพศ',
    dataIndex: 'sex',
  },
  {
    title: 'หมายเลขโทรศัพท์มือถือ',
    dataIndex: 'tel',
    sorter: {
      compare: (a, b) => a.tel.localeCompare(b.tel),
      multiple: 1,
    },
  },
  {
    title: 'สัญชาติ',
    dataIndex: 'nationnal',
  },
];

const PersonForm = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const [formData, setFormData] = useState<DataType[]>([]);
  const [value, setValue] = useState<string>('1');

  const onRadioChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      console.log('Stored form data:', JSON.parse(storedFormData));
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    console.log('Updated form data:', formData);
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const onFinish = (values: Store) => {
    const newData: DataType = {
      key: Date.now(),
      name: `${values.pername} ${values.firstName} ${values.lastName}`,
      sex: values.sex === '1' ? 'ผู้ชาย' : values.sex === '2' ? 'ผู้หญิง' : 'ไม่ระบุ',
      tel: values.tel,
      nationnal: values.nationnal === 'thai' ? 'ไทย' : values.nationnal === 'eng' ? 'อังกฤษ' : '',
    };

    setFormData((prevFormData) => [...prevFormData, newData]);

    // อัปเดตข้อมูลใน localStorage
    const storedFormData = localStorage.getItem('formData');
    let storedData: DataType[] = [];
    if (storedFormData) {
      storedData = JSON.parse(storedFormData);
    }
    storedData.push(newData);
    localStorage.setItem('formData', JSON.stringify(storedData));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  //ล้างข้อมูล
  const [form] = Form.useForm(); // เพิ่มเข้ามาเพื่อใช้งาน form instance
  const handleReset = () => {
    form.resetFields(); // รีเซ็ตค่าในฟอร์ม input
  };


  const handleResetForm = () => {
    setFormData([]); // รีเซ็ตค่าใน formData เป็น array ว่าง
    // localStorage.removeItem('formData'); // ลบข้อมูลใน localStorage
  };

  return (
    <Layout style={layoutStyle}>
      <Form
        name="person"
        initialValues={{
          pername: '',
          firstName: '',
          lastName: '',
          birthday: '',
          nationnal: '',
          ID_card: '',
          sex: '',
          tell: '',
          passport: '',
          salary: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          borderColor: '#000000',
          borderStyle: 'solid',
          borderRadius: '10px',
          padding: '1%'
        }}
        form={form} // prop form เพื่อเชื่อมต่อกับ form instance
      >

        <Space.Compact block>
          <Space>
            <Form.Item
              label={t('pername')}//คำนำหน้าชื่อ
              name="pername"
              rules={[{ required: true, message: 'กรุณาเลือกคำหน้า' }]}>
              <Select
                defaultValue="นาย"
                style={{ width: 80 }}
                options={[
                  { value: 'นาย', label: 'นาย' },
                  { value: 'นางสาว', label: 'นางสาว' },
                  { value: 'นาง', label: 'นาง' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={t('firstName')}
              name="firstName"
              rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}
              style={{ width: 400 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('lastName')}
              name="lastName"
              rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
              style={{ width: 400 }}
            >
              <Input />
            </Form.Item>
          </Space>
        </Space.Compact>

        <Space.Compact block>
          <Space>
            <Form.Item
              label={t('birthday')}
              name="birthday"
              rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label={t('nationnal')}
              name="nationnal"
              rules={[{ required: true, message: 'กรุณาเลือกสัญชาติ' }]}>
              <Select
                defaultValue=""
                style={{ width: 300 }}
                options={[
                  { value: 'thai', label: 'ไทย' },
                  { value: 'eng', label: 'อังกฤษ' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
          </Space>
        </Space.Compact >

        <Space.Compact block>
          <Form.Item
            label={t('ID_card')}
            name="ID_card"
          >
            <Space>
              <Input style={{ width: 100 }} /> - <Input /> - <Input /> - <Input /> - <Input style={{ width: 100 }} />
            </Space>
          </Form.Item>
        </Space.Compact>

        <Space.Compact block>
          <Form.Item
            label={t('sex')}
            name="sex"
            rules={[{ required: true, message: 'กรุณาระบุเพศ' }]}
          >
            <Radio.Group onChange={onRadioChange} value={value}>
              <Radio value={'1'}>{t('male')}</Radio>
              <Radio value={'2'}>{t('female')}ง</Radio>
              <Radio value={'3'}>{t('not_specified')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Space.Compact>

        <Space.Compact block>
          <Form.Item
            label={t('tel')}
            name="tel"
            rules={[{ required: true, message: 'กรุณาระบุหมายเลขโทรศัพท์มือถือ' }]}
          >
            <Space>
              <Select
                defaultValue=""
                style={{ width: 80 }}
                options={[
                  { value: '+66', label: '+66' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              /> -
              <Input style={{ width: 300 }} />
            </Space>
          </Form.Item>
        </Space.Compact>

        <Space.Compact block>
          <Form.Item
            label={t('passport')}
            name="passport"
            style={{ width: 400 }}
          >
            <Input />
          </Form.Item>
        </Space.Compact>

        <Space.Compact block>
          <Form.Item
            label={t('salary')}
            name="salary"
            style={{ width: 400 }}
            rules={[{ required: true, message: 'กรุณากรอกเงินเดือนที่คาดหวัง' }]}
          >
            <Input />
          </Form.Item>

          <div style={{ marginLeft: '20%' }}>
            <Button onClick={handleReset} style={{ borderRadius: '5px' }}>
              ล้างข้อมูล
            </Button>
          </div>

          <div  style={{ marginLeft: '5%' }}>
            <Form.Item >
              <Button htmlType="submit" style={{ borderRadius: '5px' }}>
                ส่งข้อมูล
              </Button>
            </Form.Item>
          </div>

        </Space.Compact>
      </Form>

      {/* ------------------------------------------------------------------------------------------------------------------ */}

      <div style={{ width: '90%', marginTop: '2%' }}>
        <Space.Compact block>
          <Form.Item label="เลือกทั้งหมด">
            <Button onClick={handleResetForm}>ลบข้อมูล</Button>
          </Form.Item>
        </Space.Compact>
        <Table columns={columns} dataSource={formData} onChange={handleTableChange} />
      </div>
    </Layout >
  );
};

export default PersonForm;
