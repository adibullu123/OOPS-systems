#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

class Customer{
    private:
    string name;
    int accountNumber;//unique
    bool isActive;
    static unordered_map<int,double> accountTracker;
    public:
    Customer(string name,int accountNumber,double accountBalance,bool isActive){
        if (accountTracker.count(accountNumber) > 0) {
            cout << "Please use a unique account number." << endl;
            return; // Early exit from the constructor
        }
        this->name = name;
        this->accountNumber = accountNumber;//deal with duplicates later
        accountTracker[accountNumber]=accountBalance;
        this->isActive = isActive;
    }

    void deposit(double amount){
        if(isActive){
            accountTracker[accountNumber] +=amount;
        }
        else cout<<"Account inactive"<<endl;
    }
    void withdraw(double amount){
        if(amount>accountTracker[accountNumber]){
            cout<<"Cannot withdraw more than Account Balance"<<endl;
            return;
        }
        if(isActive){
            accountTracker[accountNumber]-=amount;
        }
        else cout<<"Account inactive"<<endl;
    }
    void transfer(int amount,int targetAccount){
        if(accountTracker.count(targetAccount)>0 && accountTracker[accountNumber]>=amount && accountNumber!=targetAccount){
            accountTracker[targetAccount]+=amount;
            accountTracker[accountNumber]-=amount;
            return;
        }
        cout<<"Account not found or insufficient balance"<<endl;
    }
    void printDetails(){
        cout<<"Customer's Name :"<<name<<endl;
        cout<<"Account Number :"<<accountNumber<<endl;
        cout<<"Account Balance :"<<accountTracker[accountNumber]<<endl;
    }
};
unordered_map<int,double> Customer::accountTracker;
int main(){
    Customer c1("Aditya",1234,1000,true);
    Customer c2("Nair",1500,1000,true);
    c2.withdraw(500);
    c1.deposit(200);
    c1.printDetails();
    c2.printDetails();
    c2.transfer(300,1234);
    c2.printDetails();
    c1.printDetails();
    c2.transfer(300,1234);
    c1.transfer(1500,1500);
    c2.printDetails();
    Customer c3("testing",1234,1000,true);
    return 0;
}
